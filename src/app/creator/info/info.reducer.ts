import * as fromAuth from './info.action';
import { InfoModel } from '../models/info.model';

export interface InfoState {
    info: InfoModel;
}

const InitState: InfoState = {
    info: null
}

export function infoReducer( state= InitState, actions: fromAuth.actions ): InfoState{

    switch( actions.type ){
        case fromAuth.SET_INFO:
            return {
                info:{ ...actions.info }
            }
            case fromAuth.UNSET_INFO:
            return {
                info: null
            }
        default:
            return state
    }
}