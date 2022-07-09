import { ModalActionType, ModalTypeEnum, ModalActions } from "../../actions/modalActions/actionTypes";

export type ModalState = Record<ModalTypeEnum, any> | object;

const InitialState = {}

export const modalReducer = (state: ModalState = InitialState, action: ModalActions): ModalState => {
    switch (action.type) {
        case ModalActionType.ADD_NEW_BUG_MODAL:
            return {
                ...state,
                ['newbug']: action.payload
            }
        default:
            return state;
    }
}