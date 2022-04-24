import { Dispatch } from 'react';
import authServices from "../../utils/services/authService";
import { ActionRegister, ActionLogout, ActionType, ActionLogin } from "./actionTypes";

export const register = (name: string | null, email: string, password: string) => async (dispatch: Dispatch<ActionRegister>) => {
    try { 
        dispatch({
            type: ActionType.AUTH_REGISTER_REQUEST,
            payload: {
                loading: true
            }
        })

        const newUserRegistered = await authServices.register({
            name,
            email,
            password
        });

        dispatch({
            type: ActionType.AUTH_REGISTER_SUCCESS,
            payload: {
                userData: newUserRegistered,
                loading: false
            },
        })
    } catch (error: any) {
        const message = (error?.response?.data?.message) || error?.message

        dispatch({
            type: ActionType.AUTH_REGISTER_FAIL,
            payload: {
                error: message,
                loading: false
            }
        })
    }
}

export const login = (email: string, password: string) => async (dispatch: Dispatch<ActionLogin>) => {
    try {
        dispatch({
            type: ActionType.AUTH_LOGIN_REQUEST,
            payload: {
                loading: true
            }
        });


        const userLoggedIn = await authServices.login({
            email,
            password
        })

        dispatch({
            type: ActionType.AUTH_LOGIN_SUCCESS,
            payload: {
                userData: userLoggedIn,
                loading: false
            }
        });

    } catch (error: any) {
        const message = (error?.response?.data?.message) || error?.message

        dispatch({
            type: ActionType.AUTH_LOGIN_FAIL,
            payload: {
                error: message,
                loading: false
            }
        })
    }
}

export const logout = () => async (dispatch: Dispatch<ActionLogout>) => {
    dispatch({
        type: ActionType.AUTH_LOGOUT
    })

    await authServices.logout();
}