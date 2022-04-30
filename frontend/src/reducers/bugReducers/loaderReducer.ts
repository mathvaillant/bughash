import { ActionTypes, LoaderAction } from "../../actions/loaderActions/actionTypes";

const InitialState = false;

export const loaderReducer = (state: boolean = InitialState, action: LoaderAction): boolean => {
    switch(action.type) {
        
        case ActionTypes.SHOW_LOADER: 
            return true
        
        case ActionTypes.HIDE_LOADER:
            return false;
        
        default:
            return state;
    }
}