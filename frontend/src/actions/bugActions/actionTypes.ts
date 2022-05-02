import { IBug } from "../../shared/types";

export enum ActionType {
    GET_BUGLIST_REQUEST = 'GET_BUGLIST_REQUEST',
    GET_BUGLIST_SUCCESS = 'GET_BUGLIST_SUCCESS',
    GET_BUGLIST_FAIL = 'GET_BUGLIST_FAIL',
}

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

export type BugListAction = IGetBugListRequest | IGetBugListSuccess | IGetBugListFail