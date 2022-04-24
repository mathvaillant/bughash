import { OutputData } from "@editorjs/editorjs";

export interface ReduxState {
    auth: AuthState
    bugDescription: BugDescription
}
export interface AuthState {
    userData: IUser
    loading: boolean
    error: string | null
}

export interface BugDescription {
    content: OutputData | null
    bugId: string
    error: string
}

export interface BugIdProps {
    id: string
}

export interface IBugFiles {
    BugFiles: IBugFile[]
} 

export interface IBugFile {
    datablob: string
    type: string
    dateAdded: number
}

export interface IUser {
    email: string | null
    password?: string | null
    name?: string | null
    role?: string | null
    token?: string | null
}