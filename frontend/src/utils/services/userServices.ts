import axios from 'axios';
import { IUser } from "../../shared/types";

const USER_BASE_URL = '/users';

// Update user data
const updateData = async (userData: IUser): Promise<IUser> => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    const { data } = await axios.put(`${USER_BASE_URL}/${userData._id}`, userData, config);

    return data as IUser;
}

// Update user avatar 
const updateUserAvatar = async (avatar: File, token: string | null, userId: string): Promise<string> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        } 
    }

    const formData = new FormData;
    formData.append('avatar', avatar);

    const { data } = await axios.put(`${USER_BASE_URL}/${userId}`, formData, config);

    // Update it on localStorage
    const userLSData = JSON.parse(localStorage.getItem('ls_db_user_info') as string);
    const userLSUpdated = {...userLSData, avatar: data.newAvatar};
    localStorage.setItem('ls_db_user_info', JSON.stringify(userLSUpdated));

    return data.newAvatar;
}

export const userServices = {
    updateData,
    updateUserAvatar
}

export default userServices;

