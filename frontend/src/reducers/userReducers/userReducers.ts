import { USER_lOGIN_FAIL, USER_lOGIN_REQUEST, USER_lOGIN_SUCCESS, USER_lOGOUT } from "../../reduxTypes/userTypes";
import { userLoginReducerTypes } from "./types";

export const userLoginReducer = (state = {}, action: any): userLoginReducerTypes => {
    switch(action.type) {
        case USER_lOGIN_REQUEST: 
            return {
                loading: true,
            }

        case USER_lOGIN_SUCCESS: 
            return {
                loading: false,
                userInfo: action.payload,
            }
        
        case USER_lOGIN_FAIL: 
            return {
                loading: false,
                error: action.payload,
            }
        
        case USER_lOGOUT:
            return {
                userInfo: null
            }
        default:
            return state;
    }
}