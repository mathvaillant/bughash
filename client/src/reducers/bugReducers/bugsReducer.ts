import { ActionType, BugListAction } from "../../actions/bugActions/actionTypes";
import { IBug } from "../../shared/types";

interface State {
    bugList?: IBug[] | null
    loading: boolean
    error?: string | null
}

const InitialState = {
    bugList: null,
    loading: false,
    error: null
}

export const bugsReducer = (state: State = InitialState, action: BugListAction): State => {
    switch(action.type) {

        case ActionType.GET_BUGLIST_REQUEST:
            return {
                loading: true
            }
        
        case ActionType.GET_BUGLIST_SUCCESS:
            return {
                loading: false,
                bugList: action.payload.bugList
            }
        
        case ActionType.GET_BUGLIST_FAIL:
            return {
                loading: false,
                error: action.payload.error
            }

        default:
            return state;
    }
} 