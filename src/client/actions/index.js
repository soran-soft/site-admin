import { CHANGE_CURRENT_PATH, CHANGE_NAV_MENU_KEY } from '../constants/ActionTypes';

function changeCurrentPath(path) {
    return { 
        type: CHANGE_CURRENT_PATH,
        path
    };
}

export function isChangeCurrentPath(path) {
    return (dispatch, getState) => {
        if (getState().currentPath !== path) {
            dispatch(changeCurrentPath(path));
        }
    };
}

function changeNavMenuKey(key) {
    return {
        type: CHANGE_NAV_MENU_KEY,
        key
    };
}

export function isChangeNavMenuKey(key) {
    return (dispatch, getState) => {
        if (getState().navMenuKey !== key) {
            dispatch(changeNavMenuKey(key));
        }
    };
}