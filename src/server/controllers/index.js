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
            let pathname = location.pathname,
                initialState = {
                    main: {},
                    douban: {}
                };

            // 查找client下的sidebar配置项，以获得initialState
            if (pathname !== '/') {
                let isFound = sidebarConfig.some(function (parent, i) {
                    return parent.items.some(function (child) {
                        if (child.path === pathname) {
                            initialState.main = child;
                            initialState.main.navKey = i;

                            return true;
                        }

                        return false;
                    });
                });

                if (!isFound) {
                    initialState.main = {
                        msg: 'NotFound',
                        path: pathname,
                        navKey: -1
                    };
                }
            } else {
                initialState.main = {
                    msg: 'Dashboard',
                    path: '/',
                    navKey: 999
                };
            }

            initialState.douban.tags = [];
            initialState.douban.movies = {};
            initialState.douban.keywords = {
                tag: '热门',
                sort: 'recommend'
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

