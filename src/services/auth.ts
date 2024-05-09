
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

type CreateAccount = {
    email: string;
    password: string;
    name: string;
};

type Login = {
    email: string;
    password: string;
};

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount( { email, password, name } : CreateAccount ) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount) {
                // Directly Login to the account
            }
            else {
                return userAccount;
            }
        }
        catch(err : any) {
            throw new Error(err);
        }
    }

    async login( { email, password }: Login ) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

};

const authService = new AuthService();

export default authService;