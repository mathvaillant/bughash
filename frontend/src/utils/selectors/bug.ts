import { IBugDescription, ReduxState } from "../../shared/types";
import _ from 'underscore';

export const getBugDescription = (state: ReduxState): IBugDescription | null => _.get(state, ['bugDescription'], null);