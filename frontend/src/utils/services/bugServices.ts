import axios from 'axios';
import { IBug } from "../../shared/types";

const BUG_API_URL = '/bugs';
const UPLOAD_FILE_API = '/uploads';

const getBugs = async (token: string): Promise<IBug[]> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(BUG_API_URL, config);

    return data as IBug[];
}

const getSingleBug = async (id: string, token: string): Promise<IBug> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(`${BUG_API_URL}/${id}`, config);

    const bugData = {
        ...data,
        description: JSON.parse(data.description)
    } as IBug

    return bugData as IBug;
}

const openNew = async (bugData: IBug, token: string | null): Promise<void> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    
    if(bugData.files) {
        const paths: string[] = [];

        bugData.files.forEach(async(file: File) => {
            const { data } = await axios.post(UPLOAD_FILE_API, file, config);

            const { sourceUrl } = data;

            paths.push(sourceUrl);
        })

    }

    const { data } = await axios.post(BUG_API_URL, bugData, config);

    return data;
}

const updateBug = async (bugData: IBug, token: string): Promise<IBug> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.put(`${BUG_API_URL}/${bugData._id}`, bugData, config);

    return data as IBug;
} 

const deleteBug = async (id: string, token: string): Promise<string> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.delete(`${BUG_API_URL}/${id}`, config);

    return data?.message;
}

export const BugServices = {
    openNew,
    getSingleBug,
    getBugs,
    deleteBug,
    updateBug
}

export default BugServices;
