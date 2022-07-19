import { ITimerActions, TimerActionType } from "../actions/TimerActions";

export interface IStateTimer {
    bugId: string | null,
    running: boolean,
    disabled: boolean
}

const initialState = {
    bugId: null,
    running: false,
    disabled: true,
};

export const timerReducer = (state: IStateTimer = initialState, action: ITimerActions): IStateTimer => {
    switch (action.type) {
        case TimerActionType.TIMER_ACTIONS:
            return action.payload
        default: 
            return state;
    }
}