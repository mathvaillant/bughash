import axios from 'axios';
import { IBug } from "../../shared/types";

const BUG_API_URL = '/bugs';

const openNew = async (bugData: IBug, token: string | null): Promise<void> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.post(BUG_API_URL, bugData, config);

    return data;
}

const getBugs = async (token: string): Promise<IBug[]> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data } = await axios.get(BUG_API_URL, config);

    return data as IBug[];
}

export const BugServices = {
    openNew,
    getBugs
}

export default BugServices;
