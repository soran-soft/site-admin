import { FETCH_NEW_MOVIE, CHANGE_KEYWORDS, SAVE_TAGS } from '../constants/ActionTypes';
import { combineReducers } from 'redux';

function keywords(state = {
    tag: '热门',
    sort: 'recommend'
}, action) {
    switch (action.type) {
        case CHANGE_KEYWORDS:
            return {
                tag: action.tag,
                sort: action.sort
            };
        default:
            return state;
    }
}

function tags(state = [], action) {
    switch (action.type) {
        case SAVE_TAGS:
            return action.tags;
        default:
            return state;
    }
}

function movies(state = {}, action) {
    switch (action.type) {
        case FETCH_NEW_MOVIE:
            return Object.assign({}, state, {
                [action.key]: action.subjects
            });
        default:
            return state;
    }
}

export default combineReducers({
    tags,
    movies,
    keywords
});
