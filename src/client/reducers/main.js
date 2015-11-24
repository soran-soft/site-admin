import { CHANGE_CURRENT_PATH, CHANGE_NAV_KEY } from '../constants/ActionTypes';

export function pathInfo(state = {
    path: '/',
    text: 'Dashboard'
}, action) {
    switch (action.type) {
        case CHANGE_CURRENT_PATH:
            return {
                path: action.path,
                text: action.text
            };
        default:
            return state;
    }
}

export function navKey(state = 0, action) {
    switch (action.type) {
        case CHANGE_NAV_KEY:
            return action.key;
        default:
            return state;
    }
}