import { OutputData } from "@editorjs/editorjs";
import { Dispatch } from "react";
import { Action, ActionType } from "./actionTypes";

export const listenBugDescription = (content: OutputData) => async (dispatch: Dispatch<Action>) => {
    try {
        dispatch({
            type: ActionType.LISTEN_BUG_DESCRIPTION,
            payload: {
                content,
            }
        })
    } catch(error) {
        dispatch({
            type: ActionType.LISTEN_BUG_DESCRIPTION_FAIL,
            error: 'Could not initialize the text editor'
        })
    }
}

export const unlistenBugDescription = () => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.UNLISTEN_BUG_DESCRIPTION,
        payload: {
            content: null, 
        }
    });
}

export const getBugs = () => async (dispatch: any) => {
    //
}

export const clearBugs = () => async (dispatch: any) => {
    //
}