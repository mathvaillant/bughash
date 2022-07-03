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
const updateUserAvatar = async (avatar: File, token: string | null, userId: string): Promise<any> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        } 
    }

    const formData = new FormData;
    formData.append('avatar', avatar);

    const { data: { data: newAvatar } } = await axios.put(`${USER_BASE_URL}/${userId}/avatar`, formData, config);

    const avatarFile = new File([newAvatar], newAvatar.filename, {type: newAvatar.mimtype});

    return avatarFile;
}

export const userServices = {
    updateData,
    updateUserAvatar
}

export default userServices;

