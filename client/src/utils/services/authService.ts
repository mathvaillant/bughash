import axios from 'axios';
import { IUser } from "../../shared/types";
import { SERVER_URL } from "./serviceConstants";

const USERS_API_URL = `${SERVER_URL}/users`;

// Register user
const register = async (email: string, password: string, name: string): Promise<IUser> => {
    const { data } = await axios.post(USERS_API_URL, { email, password, name });

    if(data) {
        localStorage.setItem('ls_db_user_info', JSON.stringify(data));
    }

    return data as IUser;
}

// Login User 
const login = async (email: string, password: string): Promise<IUser> => {
    const { data } = await axios.post(`${USERS_API_URL}/login`, { email, password });

    if(data) {
        localStorage.setItem('ls_db_user_info', JSON.stringify(data));
    }

    return data as IUser
}

// Logout user
const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
        localStorage.clear();
        window.location.replace('/login');
        resolve();
    })
};

// Export all services related to auth
export const authServices = {
    register,
    logout,
    login
}

export default authServices

