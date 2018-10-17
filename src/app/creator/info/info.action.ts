import { Action } from "@ngrx/store";
import { InfoModel } from "../models/info.model";


export const SET_INFO = 'Set info';
export const UNSET_INFO = 'UnSet info';

export class SetInfoAction implements Action{
    readonly type = SET_INFO;

    constructor( public info: InfoModel){}
}

export class UnSetInfoAction implements Action{
    readonly type = UNSET_INFO;
}

export type actions = SetInfoAction | UnSetInfoAction;