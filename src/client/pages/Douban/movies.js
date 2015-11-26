import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Dropdown from '../../components/Dropdown/';
import renderChart from './renderChart';

export default class DoubanMovies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tagsConfig: {
                title: '类型',
                items: []
            }
        };
    }

    componentDidMount() {
        let self = this;

        fetch('/api/douban/tags')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                let tmp = self.state.tagsConfig;

                json.tags.forEach((v, i) => {
                    tmp.items.push({msg: v});
                });

                self.setState({
                    tagsConfig: tmp
                });
            });

        renderChart('douban-movies', 'tag=热门&sort=recommend');
    }

    dropdownHandle(i) {
        console.log(i);
    }

    render() {
        let sortConfig = {
            title: '排序',
            items: [{
                msg: '按热度排序',
                tag: 'recommend'
            }, {
                msg: '按时间排序',
                tag: 'time'
            }, {
                msg: '按评分排序',
                tag: 'rank'
            }]
        };

        return (
            <section>
                <Dropdown asStyle='inline' config={sortConfig} handleClick={this.dropdownHandle.bind(this)} />
                <Dropdown asStyle='inline' config={this.state.tagsConfig} handleClick={this.dropdownHandle.bind(this)} />
                <div id="douban-movies" style={{height: '400px'}}></div>
            </section>
        );
    }
}