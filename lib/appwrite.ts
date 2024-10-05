import { Client, Account, ID, Databases, Query, Storage, Avatars } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.dhruv.socialminds',
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID || '',
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '',
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID || '',
};

const client = new Client();

// console.log(appwriteConfig);

const databaseId = process.env.EXPO_PUBLIC_DATABASE_ID;
console.log(databaseId);


client 
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);

export const createDummyUser = () => {
    account.create(ID.unique(), "email@example.com", "password", "Walter O'Brien")
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}

const databases = new Databases(client);

export async function createUser(email: string, password: string, name: string) {
    return account.create(email, password, name);
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
      console.log(currentAccount);
    
      return currentAccount;
    } catch (error: any) {
      throw new Error("Error getting account");
    }
}
