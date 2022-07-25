import { ThemeTypes, ToggleThemeAction, TOGGLE_THEME_ACTION } from "../actions/themeAction";

const initialState = 'light';

export const toggleThemeReducer = (state: ThemeTypes = initialState, action: ToggleThemeAction): ThemeTypes => {
    switch (action.type) {
        case TOGGLE_THEME_ACTION:
            return action.theme
        default: 
            return state;
    }
}