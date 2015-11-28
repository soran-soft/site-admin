import { FETCH_NEW_MOVIE, CHANGE_KEYWORDS, SAVE_TAGS } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

function fetchMovieAction(key, subjects) {
    return { 
        type: FETCH_NEW_MOVIE,
        key,
        subjects
    };
}

function changeKeywordsAction(tag, sort) {
    return {
        type: CHANGE_KEYWORDS,
        tag,
        sort
    };
}

export function fetchMovie(tag, sort, beforeFetchCallback, callback) {
    return (dispatch, getState) => {
        let { movies, keywords } = getState().douban;

        beforeFetchCallback && beforeFetchCallback(); // 设置前置回调的目的是：在fetch的时候有数据加载中动画

        if (keywords.tag !== tag || keywords.sort !== sort) {
            dispatch(changeKeywordsAction(tag, sort));
        }

        if (Object.keys(getState().douban.movies).indexOf(`${tag}&${sort}`) === -1) {
            fetch(`/api/douban/movie?tag=${tag}&sort=${sort}`)
                .then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                })
                .then(function (json) {
                    dispatch(fetchMovieAction(`${tag}&${sort}`, json.subjects));

                    callback && callback(getState().douban.movies[`${tag}&${sort}`]);
                });
        } else {
            callback && callback(movies[`${tag}&${sort}`]);
        }
    };
}

function saveTagsAction(tags) {
    return {
        type: SAVE_TAGS,
        tags
    };
}

export function fetchTags() {
    return (dispatch, getState) => {
        if (getState().douban.tags.length === 0) {
            fetch('/api/douban/tags')
                .then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                })
                .then(function (json) {

                    let tags = json.tags.map(v => {
                        return { msg: v };                        
                    });

                    dispatch(saveTagsAction(tags));
                });
        }
    };
}