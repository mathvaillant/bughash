/* eslint-disable max-len */
import { IBug, IFile, ReduxState, StatusTypes } from "../../shared/types";
import _ from 'underscore';
import { OutputData } from "@editorjs/editorjs";

export const getBugList = (state: ReduxState): IBug[] | null => _.get(state, ['bugs', 'bugList'], null);
export const getBugsLoading = (state: ReduxState): boolean => _.get(state, ['bugs', 'loading'], false);
export const getBugTitle = (id: string) => (state: ReduxState): string | null => _.find(state?.bugs?.bugList, bug => bug._id === id)?.title || null;
export const getBugStatus = (id: string) => (state: ReduxState): StatusTypes | null => _.find(state?.bugs.bugList, bug => bug._id === id)?.status || null;
export const getBugDescription = (id: string) => (state: ReduxState): OutputData | undefined => _.find(state?.bugs.bugList, (bug) => bug._id === id)?.description || undefined
export const getBugFiles = (id: string) => (state: ReduxState): IFile[] => {
    const bugList = getBugList(state);
    if(!bugList) return [];
    
    return _.find(bugList, bug => bug.bugId === id)?.files || [];
};
