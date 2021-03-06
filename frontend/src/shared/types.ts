import { OutputData } from "@editorjs/editorjs";
import { ModalState } from "../reducers/modalReducers/modalReducers";

export interface ReduxState {
    auth: AuthState
    bugs: BugsState
    loader: boolean
    modals: ModalState
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
    files: IFile[]
    title: string
    status: 'open' | 'closed' | 'inprogress'
    timeWorked?: ITimeWorked[]
    startedWorkAt?: number
    bugId?: string
    _id?: string
    createdBy?: string
    createdAt?: string
}

export interface IUser {
    email: string
    avatar: IFile 
    name: string
    token: string
    userId: string
    _id: string
    role?: string
}

export interface IFile {
    url: string
    ref: string
}

export type StatusTypes = 'open' | 'closed' | 'inprogress';

export interface ITimeWorked {
    workers: any[]
    startedAt: number
    timeWorked?: number
    endedAt?: number
}