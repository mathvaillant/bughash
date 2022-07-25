import { ReduxState } from "../../shared/types";
import _ from 'underscore';

export const getLoader = (state: ReduxState): boolean => _.get(state, ['loader'], false);