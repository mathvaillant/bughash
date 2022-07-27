import { Dispatch } from "react";

export const TOGGLE_OPEN_CLOSE_SIDEBAR = 'TOGGLE_OPEN_CLOSE_SIDEBAR';

export interface ToggleSidebarAction {
    type: typeof TOGGLE_OPEN_CLOSE_SIDEBAR,
    expanded: boolean,
}

export const toggleSidebar = (expanded: boolean) => async (dispatch: Dispatch<ToggleSidebarAction>) => {
    dispatch({
        type: TOGGLE_OPEN_CLOSE_SIDEBAR,
        expanded,
    })
}