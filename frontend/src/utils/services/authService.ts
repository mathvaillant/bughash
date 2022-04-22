import axios from 'axios';
import { IUser } from "../../shared/types";

const USERS_API_URL = '/users';

// Register user
const register = async (userData: IUser): Promise<IUser> => {
    const response = await axios.post(USERS_API_URL, userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data as IUser;
}

// Export all services related to auth
export const authServices = {
    register
}

export default authServices

