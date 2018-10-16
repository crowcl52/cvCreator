import { Action } from "@ngrx/store";
import { WorkModel } from "../models/work.model";


export const SET_ITEMS = "[Work] Set items";
export const UNSET_ITEMS = "[Work] Unset items";

export class SetWorksAction implements Action{
    readonly type = SET_ITEMS;
    constructor( public skills:WorkModel[]){}
}

export class UnSetWorksAction implements Action{
    readonly type = UNSET_ITEMS;
}

export type actions = SetWorksAction | UnSetWorksAction;