import * as fromSkills from './work.actions';
import { WorkModel } from '../models/work.model';

export interface workState {
    items: WorkModel[];
}

const initState: workState = {
    items: []
}

export function workReducer(state = initState, action: fromSkills.actions): workState {
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