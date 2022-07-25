import axios from 'axios';
import { IFile, IUser } from "../../shared/types";
import { SERVER_URL } from "./serviceConstants";

const USER_BASE_URL = `${SERVER_URL}/users`;

interface IUserFields {
    name?: string;
    email?: string;
    avatar?: IFile;
}

export const getToken = (): string | null => {
    const userInfoStored = localStorage.getItem('ls_db_user_info');
    const userData: IUser | null = userInfoStored ? JSON.parse(userInfoStored) : null;

    return userData?.token || null;
}

// Update user data
const updateData = async (fields: IUserFields, userId: string): Promise<IUser> => {
    const token = getToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.patch(`${USER_BASE_URL}/${userId}`, fields, config);

    return data as IUser;
}

export const userServices = {
    updateData,
}

export default userServices;

