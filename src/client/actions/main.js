import { CHANGE_CURRENT_PATH, CHANGE_NAV_KEY } from '../constants/ActionTypes';

function changePathAction(path, msg) {
    return { 
        type: CHANGE_CURRENT_PATH,
        path,
        msg
    };
}

export function changePath(path, msg) {
    return (dispatch, getState) => {
        if (getState().main.path !== path) {
            dispatch(changePathAction(path, msg));
        }
    };
}

function changeNavKeyAction(key) {
    return {
        type: CHANGE_NAV_KEY,
        key
    };
}

export function changeNavKey(key) {
    return (dispatch, getState) => {
        if (getState().main.navKey !== key) {
            dispatch(changeNavKeyAction(key));
        }
    };
}