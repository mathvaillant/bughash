import { Dispatch } from "react";
import { ModalActionType, IActionNewBugModal } from "./actionTypes";

export const handleNewBugModal = ({ open }: { open: boolean }) => async (dispatch: Dispatch<IActionNewBugModal>) => {
    dispatch({
        type: ModalActionType.ADD_NEW_BUG_MODAL,
        payload: { open }
    });
}