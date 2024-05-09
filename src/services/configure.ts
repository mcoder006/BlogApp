import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

type CreatePost = {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId: string;
};

type UpdatePost = {
    title: string;
    content: string;
    featuredImage: string;
    status: string;
};

export class Services {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost( { title, slug, content, featuredImage, status, userId } : CreatePost) {
        try {
            return await this.databases.createDocument(
                config.appwriteBucketId,
                config.appwriteCollectionId,
                slug, {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost (slug: string, { title, content, featuredImage, status}: UpdatePost ) {
        try {
            return this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost (slug: string) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteProjectId,
                slug
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    async getPost(slug: string) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Post Not Found!", error);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Error in getting all posts.");
            throw error;
        }
    }

    // Uploading Files to the Database System
    async uploadFile(files: File) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                files
            );
        } catch (error) {
            console.log("Error on upload files | Services!");
            throw error;
        }
    }

    async deleteFile( fileId: string ) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Error on deleting file!");
            return error;
        }
    }

    getFilePreview( fileId: string ) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            throw error;
        }
    }
};

const service = new Services();

export default service;