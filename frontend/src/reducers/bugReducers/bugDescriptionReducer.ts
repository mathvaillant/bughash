import { OutputData } from "@editorjs/editorjs";
import { BugDescriptionAction, ActionType } from "../../actions/bugActions/actionTypes";

interface State {
    content: OutputData | null
    error?: string | null | undefined
}

const InitialState = {
    content: null,
    error: null,
}

export const bugDescriptionReducer = (state: State = InitialState, action: BugDescriptionAction): State  => {
    switch(action.type) {
        case ActionType.LISTEN_BUG_DESCRIPTION: 
            return {
                content: action.payload.content,
            }
            
        case ActionType.UNLISTEN_BUG_DESCRIPTION: 
            return InitialState

        case ActionType.LISTEN_BUG_DESCRIPTION_FAIL: 
            return {
                error: action.error,
                content: null,
            }
        default:
            return state;
    }
}