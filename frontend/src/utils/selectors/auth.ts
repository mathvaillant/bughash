import { AuthState, ReduxState } from "../../shared/types";
import _ from 'underscore';


export const getAuth = (state: ReduxState): AuthState | null => _.get(state, ['auth'], null);
export const getAuthUserDataName = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', 'name'], null);
export const getAuthUserDataEmail = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', 'email'], null);
export const getAuthUserDataRole = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', 'role'], null);