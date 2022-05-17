/* eslint-disable max-len */
import { IBug, ReduxState } from "../../shared/types";
import _ from 'underscore';

export const getBugList = (state: ReduxState): IBug[] | null => _.get(state, ['bugs', 'bugList'], null);
export const getBugsLoading = (state: ReduxState): boolean => _.get(state, ['bugs', 'loading'], false);
export const getBugFileUrls = (bugId: string) => (state: ReduxState): string[] | any => _.filter(_.get(state, ['bugs', 'bugList'], [], ), (bugItem: IBug) => bugItem._id === bugId)?.map((bug: IBug) => bug.fileUrls);