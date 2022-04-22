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
    name: string | null
    password?: string | null | undefined
    role?: string | null | undefined
}