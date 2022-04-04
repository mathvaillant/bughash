export interface BugIdProps {
    id: string
}

export interface BugFiles {
    BugFiles: BugFile[]
} 

export interface BugFile {
    datablob: string
    type: string
    dateAdded: number
}