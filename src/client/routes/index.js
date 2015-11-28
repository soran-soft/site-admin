import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../layouts/App';
import Home from '../pages/Home/';
import NotMatch from '../pages/NotMatch/';
import DoubanMovies from '../pages/Douban/Movies';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={DoubanMovies} />

        <Route path="douban">
            <Route path="movies" component={DoubanMovies} />
        </Route>

        <Route path='*' component={NotMatch} />
    </Route>
);
