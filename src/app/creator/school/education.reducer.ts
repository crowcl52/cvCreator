import * as fromSkills from './education.action';
import { EducationModel } from '../models/education.model';

export interface educationState {
    items: EducationModel[];
}

const initState: educationState = {
    items: []
}

export function educationReducer(state = initState, action: fromSkills.actions): educationState {
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