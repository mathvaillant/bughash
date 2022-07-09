import axios from 'axios';
import { IBug } from "../../shared/types";
import firebaseServices from "./firebaseServices";

const BUG_API_URL = '/bugs';

const getBugs = async (token: string): Promise<IBug[]> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data: { data: { bugs } } } = await axios.get(BUG_API_URL, config);

    return bugs as IBug[];
}

const getSingleBug = async (id: string, token: string): Promise<IBug> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data: { data: { bug } } } = await axios.get(`${BUG_API_URL}/${id}`, config);

    const bugData = {
        ...bug,
        description: JSON.parse(bug.description)
    } as IBug

    return bugData as IBug;
}

const updateBug = async (bugData: any, token: string): Promise<IBug> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data: { data: { bug } } } = await axios.patch(`${BUG_API_URL}/${bugData._id}`, bugData, config);

    return bug as IBug;
} 

const deleteBug = async (id: string, fileRefs: string[], token: string): Promise<void> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    await firebaseServices.deleteFilesFromDirStorage(fileRefs);

    await axios.delete(`${BUG_API_URL}/${id}`, config);
}

const openNew = async (bugData: any, token: string): Promise<any> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const { data: { data: { bug } } } = await axios.post(BUG_API_URL, bugData, config);

    return bug;
}

export const BugServices = {
    openNew,
    getSingleBug,
    getBugs,
    deleteBug,
    updateBug
}

export default BugServices;
