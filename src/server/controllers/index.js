import fetch from 'isomorphic-fetch';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import routes from '../../client/routes/';
import configureStore from '../../client/store/configureStore';
import sidebarConfig from '../../client/layouts/Sidebar/config';

export default {
	index: function *(next) {
		var location = createLocation(this.url);
        var error, redirectLocation, renderProps;

    	match({ routes, location }, (_error, _redirectLocation, _renderProps) => {
	        error = _error;
	        redirectLocation = _redirectLocation;
	        renderProps = _renderProps;
	    });

    	if (redirectLocation) {
            this.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            yield this.render('500');
        } else if (!renderProps) {
            yield this.render('404');
        } else {
            // if (renderProps.components.indexOf(NotFound) != -1) {
            //     _this.status = 404
            // }

            // const initialState = yield fetch('http://127.0.0.1:3000/api/initialState')
            //     .then(function(response) {
            //         if (response.status >= 400) {
            //             throw new Error("Bad response from server");
            //         }
            //         return response.json();
            //     });

            let pathname = location.pathname,
                initialState = {
                    main: {},
                    douban: {}
                };

            // 查找client下的sidebar配置项，以获得initialState
            let isFound = sidebarConfig.some(function (parent) {
                if (!parent.path) {
                    return parent.items.some(function (child) {
                        if (child.path === pathname) {
                            initialState.main = child;
                            initialState.main.navKey = parent.navKey;

                            return true;
                        }

                        return false;
                    });
                } else if (parent.path === pathname) {
                    initialState.main = {
                        msg: parent.msg,
                        path: parent.path,
                        navKey: parent.navKey
                    };

                    return true;
                }

                return false;
            });

            if (!isFound) {
                initialState.main = {
                    msg: 'NotFound',
                    path: pathname,
                    navKey: -1
                };
            }

            let doubanTags = yield fetch('http://movie.douban.com/j/search_tags?type=movie')
                .then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                });

            // tag: 热门, sort: recommend
            let doubanMovies = yield fetch('http://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0')
                .then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                });

            initialState.douban.keywords = {
                tag: '热门',
                sort: 'recommend'
            };
            initialState.douban.tags = doubanTags.tags;
            initialState.douban.movies = {
                '热门&recommend': doubanMovies.subjects
            };

            // console.log(initialState);

            const store = configureStore(initialState);

            const content = renderToString(
                <Provider store={store}>
                    <RoutingContext {...renderProps} />
                </Provider>
            );

            yield this.render('index', {
				title: 'Isomorphic App',
				appString: content,
			    initialState: JSON.stringify(initialState),
                NODE_ENV: process.env.NODE_ENV
			});
        }
	},

    notFound: function *(next) {
        yield this.render('404');
    },

	serverError: function *(next) {
		yield this.render('500');
	}
};

