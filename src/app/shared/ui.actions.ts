import { Action } from '@ngrx/store';


export const ACTIVATE_LOADING = "Cargando";
export const DESACTIVATE_LOADING = "Fin Cargando";

export class ActivateLoadingAction implements Action{
    readonly type = ACTIVATE_LOADING;
}

export class DesactivateLoadingAction implements Action{
    readonly type = DESACTIVATE_LOADING;
}


export type actions = ActivateLoadingAction | DesactivateLoadingAction;