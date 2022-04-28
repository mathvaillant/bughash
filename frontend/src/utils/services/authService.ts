import axios from 'axios';
import { IUser } from "../../shared/types";

const USERS_API_URL = '/users';

// Register user
const register = async (userData: IUser): Promise<IUser> => {
    const { data } = await axios.post(USERS_API_URL, userData);

    if(data) {
        localStorage.setItem('token', JSON.stringify(data?.token));
    }

    return data as IUser;
}

// Login User 
const login = async (userData: IUser): Promise<IUser> => {
    const { data } = await axios.post(`${USERS_API_URL}/login`, userData);

    if(data) {
        localStorage.setItem('token', JSON.stringify(data?.token));
    }

    return data as IUser
}

// Logout user
const logout =  async (): Promise<void> => {
    localStorage.clear();

    return new Promise((resolve) => {
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

