import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../layouts/App';
import Home from '../pages/Home/';
import NotMatch from '../pages/NotMatch/';
import DoubanMovies from '../pages/Douban/movies';
import Line_1 from '../pages/Line/1';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="line">
            <Route path="1" component={Line_1} />
        </Route>

        <Route path="douban">
            <Route path="movies" component={DoubanMovies} />
        </Route>

        <Route path='*' component={NotMatch} />
    </Route>
);
