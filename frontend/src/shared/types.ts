import { OutputData } from "@editorjs/editorjs";

export interface ReduxState {
    auth: AuthState
    bugDescription: IBugDescription
}
export interface AuthState {
    userData: IUser
    loading: boolean
    error: string | null
}

export interface IBugDescription {
    content: OutputData | null
    error: string
}

export interface IBugFile {
    datablob: string
    type: string
    dateAdded: number
}

export interface IBug {
    createdBy?: string
    description: IBugDescription | null
    files: IBugFile[] | null
    title: string | null
    status: string
}

export interface IUser {
    email: string | null
    password?: string | null
    name?: string | null
    role?: string | null
    token?: string | null
}