import { AuthState, ReduxState } from "../../shared/types";
import _ from 'underscore';


export const getAuth = (state: ReduxState): AuthState | null => _.get(state, ['auth'], null);
export const getAuthUserDataName = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', 'name'], null);
export const getAuthUserDataEmail = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', 'email'], null);
export const getAuthUserDataRole = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', 'role'], null);
export const getAuthUserDataToken = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', 'token'], null);
export const getAuthUserDataId = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', '_id'], null);
export const getAuthUserDataAvatar = (state: ReduxState): string | null => _.get(state, ['auth', 'userData', 'avatar'], null);
