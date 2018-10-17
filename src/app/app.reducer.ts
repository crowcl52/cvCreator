import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromInfo from './creator/info/info.reducer';
import * as fromSkill from './creator/skill/skill.reducer';
import * as fromWork from './creator/work/work.reducer';
import * as fromEducation from './creator/school/education.reducer';
import * as fromPortfolio from './creator/portfolio/portfolio.reducer';


export interface AppState{
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    skill: fromSkill.skillState;
    work: fromWork.workState;
    education: fromEducation.educationState;
    portfolio: fromPortfolio.portfolioState;
    info: fromInfo.InfoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    skill: fromSkill.skillReducer,
    work: fromWork.workReducer,
    education: fromEducation.educationReducer,
    portfolio: fromPortfolio.portfolioReducer,
    info: fromInfo.infoReducer
};