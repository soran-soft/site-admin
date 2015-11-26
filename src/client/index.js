if (process.env.BROWSER) {
    require('./assets/sass/index.scss');
}

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router } from 'react-router';
import routes from './routes/';
import configureStore from './store/configureStore';

const store = configureStore(window.__initialState);

render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root')
);