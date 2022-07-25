/* eslint-disable max-len */
import _ from 'underscore';
import { IStateTimer } from "../../reducers/timerReducer";
import { ReduxState } from "../../shared/types";

export const getStateTimer = (state: ReduxState): IStateTimer => _.get(state, 'timer', {
    bugId: null,
    running: false,
    disabled: true
});