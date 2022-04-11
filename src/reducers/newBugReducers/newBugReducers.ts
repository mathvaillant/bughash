import { OutputData } from "@editorjs/editorjs";
import { Action, ActionType } from "../../actions/newBugActions/actionTypes";

interface State {
    bugDescription?: null | {
        content: OutputData
        bugId: string
    }
    error?: null | string
}

const InitialState = {
    bugDescription: null,
    error: null,
}

export const listenBugDescriptionReducer = (state: State = InitialState, action: Action): State  => {
    switch(action.type) {
        case ActionType.LISTEN_BUG_DESCRIPTION: 
            return {
                bugDescription: {
                    content: action.payload.content,
                    bugId: action.payload.bugId
                },
            }
            
        case ActionType.UNLISTEN_BUG_DESCRIPTION: 
            return InitialState

        case ActionType.LISTEN_BUG_DESCRIPTION_FAIL: 
            return {
                error: action.error
            }
        default:
            return state;
    }
}