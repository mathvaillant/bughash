import { Dispatch } from 'react';
import { IUser } from "../../shared/types";
import authServices from "../../utils/services/authService";
import { ActionRegister, ActionLogout, ActionType, ActionLogin } from "./actionTypes";

export const register = (name: string, email: string, password: string) => async (dispatch: Dispatch<ActionRegister>) => {
    try { 
        dispatch({
            type: ActionType.AUTH_REGISTER_REQUEST,
            payload: {
                loading: true
            }
        })

        const newUserRegistered = await authServices.register(email, password, name);

        dispatch({
            type: ActionType.AUTH_REGISTER_SUCCESS,
            payload: {
                userData: newUserRegistered,
                loading: false
            },
        })
    } catch (error) {
        dispatch({
            type: ActionType.AUTH_REGISTER_FAIL,
            payload: {
                error,
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


        const userLoggedIn = await authServices.login(email, password);

        dispatch({
            type: ActionType.AUTH_LOGIN_SUCCESS,
            payload: {
                userData: userLoggedIn,
                loading: false
            }
        });

    } catch (error) {
        dispatch({
            type: ActionType.AUTH_LOGIN_FAIL,
            payload: {
                error: error,
                loading: false
            }
        })
    }
}

export const setCurrentUserData = (userLoggedIn: IUser) => async (dispatch: Dispatch<ActionLogin>) => {
    const lsUser = JSON.parse(localStorage.getItem('ls_db_user_info') as string) || {};
    const lsUserUpdated = {...lsUser, ...userLoggedIn};

    localStorage.setItem('ls_db_user_info', JSON.stringify(lsUserUpdated));

    dispatch({
        type: ActionType.SET_USER_DATA,
        payload: {
            userData: userLoggedIn,
            loading: false
        }
    });
}

export const logout = () => async (dispatch: Dispatch<ActionLogout>) => {
    dispatch({
        type: ActionType.AUTH_LOGOUT
    })

    await authServices.logout();

    window.location.replace('/login');
}