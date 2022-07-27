import { ToggleSidebarAction, TOGGLE_OPEN_CLOSE_SIDEBAR } from "../actions/sidebarActions";

const initialState = false;

export const toggleSidebarReducer = (state: boolean = initialState, action: ToggleSidebarAction): boolean => {
    switch (action.type) {
        case TOGGLE_OPEN_CLOSE_SIDEBAR:
            return action.expanded
        default: 
            return state;
    }
}