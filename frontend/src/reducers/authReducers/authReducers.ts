import { ActionLogin, ActionLogout, ActionRegister, ActionType } from "../../actions/authActions/actionTypes";
import { IUser } from "../../shared/types";

interface State {
    loading?: boolean
    userData?: IUser
    error?: string | null
}

const InitialState = {
    userData: {
        name: null,
        email: null,
        role: null,
        token: null
    },
    loading: false,
    error: null
}

export const authReducer = (state: State = InitialState, action: ActionRegister | ActionLogout | ActionLogin): State => {
    switch(action.type) {
        case ActionType.AUTH_REGISTER_REQUEST: 
            return {
                loading: true,
            }

        case ActionType.AUTH_REGISTER_SUCCESS: 
            return {
                loading: false,
                userData: action.payload.userData
            }
        
        case ActionType.AUTH_REGISTER_FAIL: 
            return {
                loading: false,
                error: action.payload.error,
            }
        
        case ActionType.AUTH_LOGIN_REQUEST:
            return {
                loading: true,
            }

        case ActionType.AUTH_LOGIN_SUCCESS:
            return {
                loading: false,
                userData: action.payload.userData
            }

        case ActionType.SET_USER_DATA:
            return {
                loading: false,
                userData: action.payload.userData
            }
        
        case ActionType.AUTH_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload.error
            }
        
        case ActionType.AUTH_LOGOUT:
            return InitialState
        default:
            return state;
    }
}