import { IUser } from "../../shared/types";

export enum ActionType {
    AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST',
    AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS',
    AUTH_REGISTER_FAIL = 'AUTH_REGISTER_FAIL',
    AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST',
    AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
    AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL',
    SET_USER_DATA = 'SET_USER_DATA',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export interface IAuthRegisterRequest {
    type: ActionType.AUTH_REGISTER_REQUEST,
    payload: {
        loading: boolean
    }
}

export interface IAuthRegisterSuccess {
    type: ActionType.AUTH_REGISTER_SUCCESS
    payload: {
        userData: IUser
        loading: boolean
    }
}

export interface IAuthRegisterFail {
    type: ActionType.AUTH_REGISTER_FAIL
    payload: {
        error: any
        loading: boolean
    }
}

export interface IAuthLoginRequest {
    type: ActionType.AUTH_LOGIN_REQUEST,
    payload: {
        loading: boolean
    }
}

export interface IAuthLoginSuccess {
    type: ActionType.AUTH_LOGIN_SUCCESS
    payload: {
        userData: IUser
        loading: boolean
    }
}

export interface IsetCurrentUserData {
    type: ActionType.SET_USER_DATA
    payload: {
        userData: IUser
        loading: boolean
    }
}

export interface IAuthLoginFail {
    type: ActionType.AUTH_LOGIN_FAIL
    payload: {
        error: any
        loading: boolean
    }
}

export interface IAuthLogout {
    type: ActionType.AUTH_LOGOUT
}

export type ActionRegister = IAuthRegisterRequest | IAuthRegisterSuccess | IAuthRegisterFail;
export type ActionLogin = IAuthLoginRequest | IAuthLoginSuccess | IAuthLoginFail | IsetCurrentUserData
export type ActionLogout = IAuthLogout