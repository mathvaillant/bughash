/* eslint-disable max-len */
import { IBug, IFile, ReduxState } from "../../shared/types";
import _ from 'underscore';

export const getBugList = (state: ReduxState): IBug[] | null => _.get(state, ['bugs', 'bugList'], null);
export const getBugsLoading = (state: ReduxState): boolean => _.get(state, ['bugs', 'loading'], false);
export const getBugFiles = (id: string) => (state: ReduxState): IFile[] => {
    const bugList = getBugList(state);
    if(!bugList) return [];
    
    return _.find(bugList, bug => bug._id === id)?.files || [];
};