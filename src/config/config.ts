
type ConfigData = {
    appwriteUrl: string;
    appwriteProjectId: string;
    appwriteDatabaseId: string;
    appwriteBucketId: string;
    appwriteCollectionId: string;
};


const config: ConfigData = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
    appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID)
};

export default config;