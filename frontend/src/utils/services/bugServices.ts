import axios from 'axios';
import { IBug } from "../../shared/types";

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

const openNew = async (bugData: IBug, token: string | null): Promise<IBug> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const { data: { data: { bug } } } = await axios.post(BUG_API_URL, bugData, config);

    return bug;
}

const updateBug = async (bugData: IBug, token: string): Promise<IBug> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data: { data: { bug } } } = await axios.put(`${BUG_API_URL}/${bugData._id}`, bugData, config);

    return bug as IBug;
} 

const deleteBug = async (id: string, token: string): Promise<string> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data: { data: { message } } } = await axios.delete(`${BUG_API_URL}/${id}`, config);

    return message;
}

export const BugServices = {
    openNew,
    getSingleBug,
    getBugs,
    deleteBug,
    updateBug
}

export default BugServices;
