import { Dispatch } from "react";
import { ActionTypes, LoaderAction } from "./actionTypes";

export const showLoader = () => (dispatch: Dispatch<LoaderAction>) => {
    dispatch({
        type: ActionTypes.SHOW_LOADER
    })
} 

export const hideLoader = () => (dispatch: Dispatch<LoaderAction>) => {
    dispatch({
        type: ActionTypes.HIDE_LOADER
    })
} 