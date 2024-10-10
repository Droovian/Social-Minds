import { Client, Account, ID, Databases, Query, Storage, Avatars, Models, OAuthProvider, Messaging } from 'react-native-appwrite';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';
import { init } from '@emailjs/react-native';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.dhruv.socialminds',
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID || '',
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '',
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID || '',
};

const publicKey = '47t9QkVW0yv1DCmSX';

init({
    publicKey: publicKey,
})

const client = new Client();

//  console.log(appwriteConfig);

client 
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);

export async function createUser(email: string, password: string, username: string) {
    
    try{
        const newUserAcc = await account.create(ID.unique(), email, password, username);

        if(!newUserAcc){
            throw new Error("Failed to create account");
        }

        // const otp = generateOTP();
        // const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        // const emailSent = await sendEmail(email, otp);
        // if(!emailSent){ throw new Error("Failed to send email"); }

        await signIn(email, password);

        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId,
            ID.unique(), 
            {
                accountId: newUserAcc?.$id,
                email: email,
                username: username,
            }
        );

        return newUser;
    }
    catch(error: any){
        console.error("Error creating user:", error.message || error);
        throw new Error("Error creating user!");
    }
}

export async function verifyOTP(email: string, enteredOTP: string) {
    try {
        const userDocuments = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("email", email)]
        );

        if (userDocuments.total === 0) {
            throw new Error("No user found with this email.");
        }

        const user = userDocuments.documents[0];
        const currentTime = new Date();

        // Check if the OTP has expired
        if (currentTime > new Date(user.otpExpiry)) {
            throw new Error("OTP has expired. Please request a new one.");
        }

        if (user.otp === enteredOTP) {
            // OTP is correct; proceed with further actions, like confirming the account
            console.log("OTP verified successfully!");

            // Optionally, clear the OTP from the database after successful verification
            await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                user.$id,
                { otp: null, otpExpiry: null } // Clear the OTP and expiry
            );

            return { message: "OTP verified successfully!" };
        } else {
            throw new Error("Invalid OTP entered.");
        }
    } catch (error: any) {
        console.error("Error verifying OTP:", error.message || error);
        throw new Error("Error verifying OTP!");
    }
}

export async function signIn(email: string, password: string) {

    try {
        const session = await account.createEmailPasswordSession(email, password);
        console.log(session);

        return session;
    }
    catch(error: any){
        throw new Error("Error signing in");
    }
}

export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}

export async function sendEmail(email: string, otp: string) {

    try {

        const templateParams = {
            to_email: email,
            otp: otp,
        }
        const response: EmailJSResponseStatus = await send('service_lco249x', 'template_juk4xeb', templateParams);

        console.log('Email sent:', response);
        return true;
    }
    catch(err){
        console.error('Error sending email:', err);
        return false;
    }
}
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();

      if (!currentAccount) throw Error;
  
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } 
    catch (error) {
      console.log(error);
      return null;
    }
  }

export async function getAccount() {
    try {
      const currentAccount = await account.get();
    
      return currentAccount;
    } catch (error: any) {
      throw new Error(error);
    }
}

export async function logout() {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}
