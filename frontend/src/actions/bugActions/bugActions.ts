import { Dispatch } from "react";
import { IBug } from "../../shared/types";
import BugServices from "../../utils/services/bugServices";
import { ActionType, BugListAction } from "./actionTypes";

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

export const updateBugsListState = (bugList: IBug[]) => async (dispatch: Dispatch<BugListAction>) => {
    try {
        dispatch({
            type: ActionType.GET_BUGLIST_REQUEST,
            payload: {
                loading: true
            }
        });

        dispatch({
            type: ActionType.GET_BUGLIST_SUCCESS,
            payload: {
                loading: false,
                bugList
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