import fetch from 'isomorphic-fetch';
import customInfo from '../config/customInfo';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import routes from '../../client/routes/';
import configureStore from '../../client/store/configureStore';

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
                initialState = {};

            customInfo.some(function (v) { // All params: value, index, array
                let flag = (v.path === pathname);

                if (flag) {
                    initialState.main = v;
                }

                return flag;
            });

            console.log(initialState);

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

