import _ from "underscore";
import { ReduxState } from "../../shared/types";

export const getSidebarExpandedState = (state: ReduxState): boolean => _.get(state, 'sidebarExpanded', false);