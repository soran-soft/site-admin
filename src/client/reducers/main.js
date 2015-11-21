import { CHANGE_CURRENT_PATH, CHANGE_NAV_MENU_KEY } from '../constants/ActionTypes';

export function currentPath(state = '/', action) {
    switch (action.type) {
        case CHANGE_CURRENT_PATH:
            return action.path;
        default:
            return state;
    }
}

export function navMenuKey(state = 0, action) {
    switch (action.type) {
        case CHANGE_NAV_MENU_KEY:
            return action.key;
        default:
            return state;
    }
}