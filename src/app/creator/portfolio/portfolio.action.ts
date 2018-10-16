import { Action } from "@ngrx/store";
import { PortfolioModel } from "../models/portfolio.model";


export const SET_ITEMS = "[Portfolio] Set items";
export const UNSET_ITEMS = "[Portfolio] Unset items";

export class SetPortfoliosAction implements Action{
    readonly type = SET_ITEMS;
    constructor( public portfolio:PortfolioModel[]){}
}

export class UnSetPortfoliosAction implements Action{
    readonly type = UNSET_ITEMS;
}

export type actions = SetPortfoliosAction | UnSetPortfoliosAction;