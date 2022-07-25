import { OutputData } from "@editorjs/editorjs";
import axios from 'axios';
import { IBug, IFile, ITimeWorked } from "../../shared/types";
import { SERVER_URL } from "./serviceConstants";
import firebaseServices from "./firebaseServices";
import { getToken } from "./userServices";

const BUG_API_URL = `${SERVER_URL}/bugs`;

interface IBugFields {
    title?: string
    files?: IFile[]
    description?: OutputData | undefined
    status?: string
    timeWorked?: ITimeWorked
    startedWorkAt?: number
}

export interface IBugServicesResponse {
    status: 'ok' | 'fail',
    message: string,
    newBug?: IBug
}

const getBugs = async (token: string): Promise<IBug[]> => {
    const config = { headers: { Authorization: `Bearer ${token}` }}

    const { data: { data: { bugs } } } = await axios.get(BUG_API_URL, config);

    return bugs as IBug[];
}

const getSingleBug = async (id: string, token: string): Promise<IBug> => {
    const config = { headers: { Authorization: `Bearer ${token}` }}

    const { data: { data: { bug } } } = await axios.get(`${BUG_API_URL}/${id}`, config);

    const bugData = {
        ...bug,
        description: bug?.description ? JSON.parse(bug?.description) : null
    } as IBug

    return bugData as IBug;
}

const updateBug = async ({ fields, bugId }: { fields: IBugFields, bugId: string }): Promise<IBugServicesResponse> => {
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` }}

    const fieldsToUpdate = {...fields};

    const { data: { message, status } } = await axios.patch(`${BUG_API_URL}/${bugId}`, fieldsToUpdate, config);

    return {
        status,
        message,
    };
} 

const deleteBug = async (id: string, fileRefs: string[], token: string): Promise<IBugServicesResponse> => {
    const config = { headers: { Authorization: `Bearer ${token}` }}

    await firebaseServices.deleteFilesFromDirStorage(fileRefs);

    const { data: { status, message } } = await axios.delete(`${BUG_API_URL}/${id}`, config);

    return {
        status,
        message
    }
}

const openNew = async ({ fields } : { fields: IBugFields }) : Promise<IBugServicesResponse> => {
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` }}

    const { data: { message, status, newBug } } = await axios.post(BUG_API_URL, fields, config);

    return {
        status,
        message,
        newBug
    };
}

export const BugServices = {
    openNew,
    getSingleBug,
    getBugs,
    deleteBug,
    updateBug
}

export default BugServices;
