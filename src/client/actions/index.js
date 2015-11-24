import { CHANGE_CURRENT_PATH, CHANGE_NAV_KEY } from '../constants/ActionTypes';

function changePathAction(path, text) {
    return { 
        type: CHANGE_CURRENT_PATH,
        path,
        text
    };
}

export function changePath(path, text) {
    return (dispatch, getState) => {
        if (getState().pathInfo.path !== path) {
            dispatch(changePathAction(path, text));
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
        if (getState().navKey !== key) {
            dispatch(changeNavKeyAction(key));
        }
    };
}