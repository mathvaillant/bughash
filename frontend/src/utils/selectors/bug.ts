/* eslint-disable max-len */
import { IBug, ReduxState } from "../../shared/types";
import _ from 'underscore';

export const getBugList = (state: ReduxState): IBug[] | null => _.get(state, ['bugs', 'bugList'], null);
export const getBugsLoading = (state: ReduxState): boolean => _.get(state, ['bugs', 'loading'], false);