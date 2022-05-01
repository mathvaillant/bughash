import { IBug, IBugDescription, ReduxState } from "../../shared/types";
import _ from 'underscore';
import { OutputData } from "@editorjs/editorjs";

export const getBugDescriptionContent = (state: ReduxState): OutputData | null => _.get(state, ['bugDescription', 'content'], null);
export const getBugList = (state: ReduxState): IBug[] | null => _.get(state, ['bugs', 'bugList'], null);
export const getBugsLoading = (state: ReduxState): boolean => _.get(state, ['bugs', 'loading'], false);