import { Dispatch } from 'react';
import authServices from "../../utils/services/authService";
import { Action, ActionType } from "./actionTypes";

export const register = (name: string | null, email: string, password: string) => async (dispatch: Dispatch<Action>) => {
    try { 
        dispatch({
            type: ActionType.AUTH_REQUEST,
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
            type: ActionType.AUTH_SUCCESS,
            payload: {
                userData: newUserRegistered,
                loading: false
            },
        })

        localStorage.setItem('userInfo', JSON.stringify(newUserRegistered));
    } catch (error: any) {
        const message = (error?.response?.data?.message) || error?.message || error.toString()

        dispatch({
            type: ActionType.AUTH_FAIL,
            payload: {
                error: message,
                loading: false
            }
        })
    }
}