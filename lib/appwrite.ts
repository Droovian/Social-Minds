import { Client, Account, ID, Databases, Query, Storage, Avatars, Models, OAuthProvider } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.dhruv.socialminds',
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID || '',
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '',
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID || '',
};

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

        // const verify = await account.createVerification('https://be11-36-255-232-90.ngrok-free.app/verify');

        // if(!verify){
        //     console.log("Failed to send verification email");
        // }

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
