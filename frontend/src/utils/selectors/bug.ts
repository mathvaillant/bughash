import { BugDescription, ReduxState } from "../../shared/types";
import _ from 'underscore';

export const getBugDescription = (state: ReduxState): BugDescription | null => _.get(state, ['bugDescription'], null);