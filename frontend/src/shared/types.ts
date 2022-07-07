import { OutputData } from "@editorjs/editorjs";

export interface ReduxState {
    auth: AuthState
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

export interface IBug {
    description: OutputData
    files: File[]
    title: string
    status: string
    _id?: string
    createdBy?: string
    createdAt?: string
}

export interface IUser {
    email: string
    avatar: IFile 
    name: string
    token: string
    _id: string
    role?: string
}

export interface IFile {
    url: string
    ref: string
}