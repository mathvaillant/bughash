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

export const userServices = {
    updateData
}

export default userServices;

