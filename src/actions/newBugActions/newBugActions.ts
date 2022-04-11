import { OutputData } from "@editorjs/editorjs";
import { Dispatch } from "react";
import { LISTEN_BUG_DESCRIPTION, LISTEN_BUG_DESCRIPTION_FAIL } from "./types";

export interface IListenBugDescription {
    type: 'LISTEN_BUG_DESCRIPTION'
    payload: OutputData
}

export interface IListenBugDescriptionFail {
    type: 'LISTEN_BUG_DESCRIPTION_FAIL'
    error: string
}

export const listenBugDescription = (data: OutputData) => async (dispatch: Dispatch<IListenBugDescription | IListenBugDescriptionFail>) => {
    try {
        dispatch({
            type: LISTEN_BUG_DESCRIPTION,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: LISTEN_BUG_DESCRIPTION_FAIL,
            error: 'Could not initialize the text editor'
        })
    }
}