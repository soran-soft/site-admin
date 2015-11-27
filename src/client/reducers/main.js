import { CHANGE_CURRENT_PATH, CHANGE_NAV_KEY } from '../constants/ActionTypes';

export default function main(state = {
    path: '/',
    msg: 'Dashboard',
    navKey: 0
}, action) {
    switch (action.type) {
        case CHANGE_CURRENT_PATH:
            return Object.assign({}, state, {
                path: action.path,
                msg: action.msg
            });
        case CHANGE_NAV_KEY:
            return Object.assign({}, state, {
                navKey: action.key
            });
        default:
            return state;
    }
}
