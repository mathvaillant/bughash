import _ from 'underscore';
import { ThemeTypes } from "../../actions/themeAction";
import { ReduxState } from "../../shared/types";

export const getAppTheme = (state: ReduxState): ThemeTypes => _.get(state, 'theme', 'light');