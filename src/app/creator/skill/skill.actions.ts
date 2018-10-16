import { Action } from "@ngrx/store";
import { SkillModel } from "../models/skill.model";


export const SET_ITEMS = "[Skill] Set items";
export const UNSET_ITEMS = "[Skill] Unset items";

export class SetSkillsAction implements Action{
    readonly type = SET_ITEMS;
    constructor( public skills:SkillModel[]){}
}

export class UnSetSkillsAction implements Action{
    readonly type = UNSET_ITEMS;
}

export type actions = SetSkillsAction | UnSetSkillsAction;