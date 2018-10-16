import * as fromSkills from './skill.actions';
import { SkillModel } from '../models/skill.model';

export interface skillState {
    items: SkillModel[];
}

const initState: skillState = {
    items: []
}

export function skillReducer(state = initState, action: fromSkills.actions): skillState {
    switch (action.type) {

        case fromSkills.SET_ITEMS:
            return {
                items: [
                    ...action.skills.map(item => {
                        return { ...item }
                    })
                ]
            }
        case fromSkills.UNSET_ITEMS:
            return {
                items: []
            }
        default:
            return state;
    }
}