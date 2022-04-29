import { OutputData } from "@editorjs/editorjs";

export enum ActionType {
    LISTEN_BUG_DESCRIPTION = 'LISTEN_BUG_DESCRIPTION',
    LISTEN_BUG_DESCRIPTION_FAIL = 'LISTEN_BUG_DESCRIPTION_FAIL',
    UNLISTEN_BUG_DESCRIPTION = 'UNLISTEN_BUG_DESCRIPTION',
}

export interface IListenBugDescription {
    type: ActionType.LISTEN_BUG_DESCRIPTION
    payload: {
        content: OutputData,
    }
}

export interface IListenBugDescriptionFail {
    type: ActionType.LISTEN_BUG_DESCRIPTION_FAIL
    error: string
}

export interface IUnlistenBugDescription {
    type: ActionType.UNLISTEN_BUG_DESCRIPTION,
    payload: {
        content: null,
    }
}

export type Action = IListenBugDescription | IListenBugDescriptionFail | IUnlistenBugDescription;