import { IUser } from "../../shared/types";

export enum ActionType {
    AUTH_REQUEST = 'AUTH_REQUEST',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAIL = 'AUTH_FAIL',
    lOGOUT = 'lOGOUT',
}

export interface IAuthRequest {
    type: ActionType.AUTH_REQUEST,
    payload: {
        loading: boolean
    }

}

export interface IAuthSuccess {
    type: ActionType.AUTH_SUCCESS
    payload: {
        userData: IUser
        loading: boolean
    }
}

export interface IAuthFail {
    type: ActionType.AUTH_FAIL
    payload: {
        error: string | null | undefined | object,
        loading: boolean
    }
}

export type Action = IAuthRequest | IAuthSuccess | IAuthFail;