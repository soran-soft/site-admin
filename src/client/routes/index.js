import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../layouts/App';
import Home from '../pages/Home/';
import NotMatch from '../pages/NotMatch/';
import * as Douban from '../pages/Douban/';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Douban.Movies} />

        <Route path="douban">
            <Route path="movies" component={Douban.Movies} />
            <Route path="shops" component={Douban.Shops} />
        </Route>

        <Route path='*' component={NotMatch} />
    </Route>
);
