import _ from 'underscore';
import { ReduxState } from "../../shared/types";

export const getModalState = (modalType: string) => (state: ReduxState): any | null => _.get(state, ['modals', modalType], null);