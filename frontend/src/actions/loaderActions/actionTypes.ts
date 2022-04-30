export enum ActionTypes {
    SHOW_LOADER = 'SHOW_LOADER',
    HIDE_LOADER = 'HIDE_LOADER'
}

export interface IShowLoader {
    type: ActionTypes.SHOW_LOADER
}

export interface IHideLoader {
    type: ActionTypes.HIDE_LOADER
}

export type LoaderAction = IShowLoader | IHideLoader