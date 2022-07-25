export enum ModalActionType {
    ADD_NEW_BUG_MODAL = 'ADD_NEW_BUG_MODAL',
}

export interface IActionNewBugModal {
    type: ModalActionType.ADD_NEW_BUG_MODAL,
    payload: { 
        open: boolean 
    }
}

export type ModalTypeEnum = 'newbug' | ''; 
export type ModalActions = IActionNewBugModal;