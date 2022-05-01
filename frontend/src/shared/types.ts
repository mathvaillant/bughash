import { OutputData } from "@editorjs/editorjs";

export interface ReduxState {
    auth: AuthState
    bugDescription: IBugDescription
    bugs: BugsState
    loader: boolean
}
export interface AuthState {
    userData: IUser
    loading: boolean
    error: string | null
}

export interface BugsState {
    bugList: IBug[]
    loading: boolean
    error: string | null | object
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
    description: OutputData
    files: IBugFile[]
    title: string
    status: string
    _id?: string
    createdBy?: string
    createdAt?: string
}

export interface IUser {
    email: string | null
    password?: string | null
    name?: string | null
    role?: string | null
    token?: string | null
}