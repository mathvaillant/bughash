import { Dispatch } from "react";

export const TOGGLE_THEME_ACTION = 'TOGGLE_THEME_ACTION';
export type ThemeTypes = 'light' | 'dark';

export interface ToggleThemeAction {
    type: typeof TOGGLE_THEME_ACTION,
    theme: ThemeTypes
}

export const toggleTheme = (theme: ThemeTypes) => async (dispatch: Dispatch<ToggleThemeAction>) => {
    dispatch({
        type: TOGGLE_THEME_ACTION,
        theme: theme
    })
}