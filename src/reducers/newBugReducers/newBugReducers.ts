import { LISTEN_BUG_DESCRIPTION, LISTEN_BUG_DESCRIPTION_FAIL } from "../../actions/newBugActions/types";


export const listenBugDescriptionReducer = (state = {}, action: any): any  => {
    switch(action.type) {
        case LISTEN_BUG_DESCRIPTION: 
            return {
                bugDescription: action.payload.content,
                bugId: action.payload.bugId
            }
        case LISTEN_BUG_DESCRIPTION_FAIL: 
            return {
                bugDescription: null,
                error: action.payload
            }
        default:
            return state;
    }
}