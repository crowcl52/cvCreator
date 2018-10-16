import * as fromSkills from './portfolio.action';
import { PortfolioModel } from '../models/portfolio.model';

export interface portfolioState {
    items: PortfolioModel[];
}

const initState: portfolioState = {
    items: []
}

export function portfolioReducer(state = initState, action: fromSkills.actions): portfolioState {
    switch (action.type) {

        case fromSkills.SET_ITEMS:
            return {
                items: [
                    ...action.portfolio.map(item => {
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