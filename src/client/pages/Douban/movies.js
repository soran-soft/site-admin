import renderChart from './renderChart';

import React, { Component } from 'react';

export default class DoubanMovies extends Component {
    componentDidMount() {
        renderChart('douban-movies');
    }

    render() {
        return (
            <div id="douban-movies" style={{height: '400px'}}></div>
        );
    }
}