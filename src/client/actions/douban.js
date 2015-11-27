import { FETCH_NEW_MOVIE, CHANGE_KEYWORDS } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

function fetchMovieAction(key, subjects) {
    return { 
        type: FETCH_NEW_MOVIE,
        key,
        subjects
    };
}

export function fetchMovie(tag, sort, callback) {
    return (dispatch, getState) => {
        let { movies, keywords } = getState().douban;

        if (keywords.tag !== tag || keywords.sort !== sort) {
            dispatch(changeKeywordsAction(tag, sort));

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
        }
    };
}

function changeKeywordsAction(tag, sort) {
    return {
        type: CHANGE_KEYWORDS,
        tag,
        sort
    };
}
