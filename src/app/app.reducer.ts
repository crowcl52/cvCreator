import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromSkill from './creator/skill/skill.reducer';
import * as fromWork from './creator/work/work.reducer';


export interface AppState{
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    skill: fromSkill.skillState;
    work: fromWork.workState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    skill: fromSkill.skillReducer,
    work: fromWork.workReducer
};