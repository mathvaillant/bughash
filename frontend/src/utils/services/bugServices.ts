import { OutputData } from "@editorjs/editorjs";
import axios from 'axios';
import { IBug, IFile } from "../../shared/types";
import firebaseServices from "./firebaseServices";
import { getToken } from "./userServices";

const BUG_API_URL = '/bugs';

interface IBugFields {
    title?: string
    files?: IFile[]
    description?: OutputData | undefined
    status?: string
}

const getBugs = async (token: string): Promise<IBug[]> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data: { data: { bugs } } } = await axios.get(BUG_API_URL, config);
    
    const bugsFormatted = bugs.map((bug: any) => ({
        ...bug,
        description: JSON.parse(bug.description)
    }));

    return bugsFormatted as IBug[];
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
        description: bug?.description ? JSON.parse(bug?.description) : null
    } as IBug

    return bugData as IBug;
}

const updateBug = async ({ fields, bugId }: { fields: IBugFields, bugId: string }): Promise<IBug> => {
    const token = getToken();
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const fieldsToUpdate = {...fields};

    const { data: { data: { bug } } } = await axios.patch(`${BUG_API_URL}/${bugId}`, fieldsToUpdate, config);

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

const openNew = async ({ fields }: { fields: IBugFields }): Promise<IBug> => {
    const token = getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const { data: { data: { bug } } } = await axios.post(BUG_API_URL, fields, config);

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
