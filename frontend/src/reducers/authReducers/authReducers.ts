import { Action, ActionType } from "../../actions/authActions/actionTypes";
import { IUser } from "../../shared/types";

interface State {
    loading?: boolean
    userData?: IUser
    error?: string | null | undefined | object
}

const InitialState = {
    userData: {
        name: null,
        email: null,
        role: null
    },
    loading: false,
    error: null
}

export const authReducer = (state: State = InitialState, action: Action): State => {
    switch(action.type) {
        case ActionType.AUTH_REQUEST: 
            return {
                loading: true,
            }

        case ActionType.AUTH_SUCCESS: 
            return {
                loading: false,
                userData: action.payload.userData
            }
        
        case ActionType.AUTH_FAIL: 
            return {
                loading: false,
                error: action.payload,
            }
        
        /* case lOGOUT:
            return {
                userInfo: null
            } */
        default:
            return state;
    }
}