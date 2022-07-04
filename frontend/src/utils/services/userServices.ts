import axios from 'axios';
import { IUser } from "../../shared/types";

const USER_BASE_URL = '/users';

// Update user data
const updateData = async (userData: any, userId: string, token: any): Promise<IUser> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.patch(`${USER_BASE_URL}/${userId}`, userData, config);

    return data as IUser;
}

export const userServices = {
    updateData,
}

export default userServices;

