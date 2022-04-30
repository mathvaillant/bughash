import { OutputData } from "@editorjs/editorjs";
import { IBug } from "../../shared/types";

export enum ActionType {
    LISTEN_BUG_DESCRIPTION = 'LISTEN_BUG_DESCRIPTION',
    LISTEN_BUG_DESCRIPTION_FAIL = 'LISTEN_BUG_DESCRIPTION_FAIL',
    UNLISTEN_BUG_DESCRIPTION = 'UNLISTEN_BUG_DESCRIPTION',
    GET_BUGLIST_REQUEST = 'GET_BUGLIST_REQUEST',
    GET_BUGLIST_SUCCESS = 'GET_BUGLIST_SUCCESS',
    GET_BUGLIST_FAIL = 'GET_BUGLIST_FAIL',
}

// Bug Description
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

// Get the list bugs
export interface IGetBugListRequest {
    type: ActionType.GET_BUGLIST_REQUEST,
    payload: {
        loading: boolean
    }
}
export interface IGetBugListSuccess {
    type: ActionType.GET_BUGLIST_SUCCESS,
    payload: {
        bugList: IBug[],
        loading: boolean
    }
}
export interface IGetBugListFail {
    type: ActionType.GET_BUGLIST_FAIL,
    payload: {
        loading: boolean,
        error: string
    }
}

export type BugDescriptionAction = IListenBugDescription | IListenBugDescriptionFail | IUnlistenBugDescription;
export type BugListAction = IGetBugListRequest | IGetBugListSuccess | IGetBugListFail