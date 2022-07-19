import { Dispatch } from "react";

export enum TimerActionType {
    TIMER_ACTIONS = 'TIMER_ACTIONS'
}

export interface ITimerActions {
    type: TimerActionType.TIMER_ACTIONS,
    payload: {
        bugId: string | null,
        running: boolean,
        disabled: boolean
    }
}

export const setTimer = (
    { bugId = null, running = false, disabled = false, reset = false } : 
    { bugId?: string | null, running?: boolean, disabled?: boolean, reset?: boolean }
) => async (dispatch: Dispatch<ITimerActions>) => {
    if(reset) {
        dispatch({
            type: TimerActionType.TIMER_ACTIONS,
            payload: { 
                bugId: null, 
                running: false, 
                disabled: true,
            }
        });
        return;
    }

    dispatch({
        type: TimerActionType.TIMER_ACTIONS,
        payload: { 
            bugId, 
            running, 
            disabled,
        }
    });
}