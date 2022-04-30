import { OutputData } from "@editorjs/editorjs";
import { Dispatch } from "react";
import BugServices from "../../utils/services/bugServices";
import { BugDescriptionAction, ActionType, BugListAction } from "./actionTypes";

export const listenBugDescription = (content: OutputData) => async (dispatch: Dispatch<BugDescriptionAction>) => {
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

export const unlistenBugDescription = () => async (dispatch: Dispatch<BugDescriptionAction>) => {
    dispatch({
        type: ActionType.UNLISTEN_BUG_DESCRIPTION,
        payload: {
            content: null, 
        }
    });
}

export const getBugsList = (token: string) => async (dispatch: Dispatch<BugListAction>) => {
    try {
        dispatch({
            type: ActionType.GET_BUGLIST_REQUEST,
            payload: {
                loading: true
            }
        });

        const data = await BugServices.getBugs(token);

        dispatch({
            type: ActionType.GET_BUGLIST_SUCCESS,
            payload: {
                loading: false,
                bugList: data
            }
        });
    } catch (error: any) {
        dispatch({
            type: ActionType.GET_BUGLIST_FAIL,
            payload: {
                loading: false,
                error: error
            }
        })
    }
}