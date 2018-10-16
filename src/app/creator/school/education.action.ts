import { Action } from "@ngrx/store";
import { EducationModel } from "../models/education.model";


export const SET_ITEMS = "[Education] Set items";
export const UNSET_ITEMS = "[Education] Unset items";

export class SetEducationsAction implements Action{
    readonly type = SET_ITEMS;
    constructor( public skills:EducationModel[]){}
}

export class UnSetEducationsAction implements Action{
    readonly type = UNSET_ITEMS;
}

export type actions = SetEducationsAction | UnSetEducationsAction;