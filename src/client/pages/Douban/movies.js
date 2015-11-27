import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import DropdownSelect from '../../components/Dropdown/Select';
import renderChart from './renderChart';

export default class DoubanMovies extends Component {
    static defaultProps = {
        sortConfig: { // 排序按钮的配置
            title: '按热度排序',
            items: [{
                msg: '按热度排序',
                sort: 'recommend'
            }, {
                msg: '按时间排序',
                sort: 'time'
            }, {
                msg: '按评分排序',
                sort: 'rank'
            }]
        },
        chart: { // 图表的图例及图表类型
            name: '评分',
            type: 'line'
        }
    }

    state = {
        tagsConfig: {
            title: '热门',
            items: []
        }
    }

    // 关键词检索
    asKeyWord = {
        tag: '热门',
        sort: this.props.sortConfig.items[0].sort
    }

    componentWillMount() {
        fetch('/api/douban/tags')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                let tmp = this.state.tagsConfig;

                json.tags.forEach((v, i) => {
                    tmp.items.push({msg: v});
                });

                this.setState({
                    tagsConfig: tmp
                });
            }.bind(this));
    }

    componentDidMount() {
        let { tag, sort } = this.asKeyWord,
            { name, type } = this.props.chart;

        let chartInfo = {
            tag, sort, name, type
        };

        // 渲染图表
        renderChart('douban-movies', `tag=${tag}&sort=${sort}`, chartInfo);
    }

    dropdownTagsHandle(tag) {
        this.asKeyWord.tag = tag;

        let { sort } = this.asKeyWord,
            { name, type } = this.props.chart;

        let chartInfo = {
            tag, sort, name, type
        };

        renderChart('douban-movies', `tag=${tag}&sort=${sort}`, chartInfo);
    }
    
    dropdownSortHandle(sort) {
        this.asKeyWord.sort = sort;

        let { tag } = this.asKeyWord,
            { name, type } = this.props.chart;

        let chartInfo = {
            tag, sort, name, type
        };

        renderChart('douban-movies', `tag=${tag}&sort=${sort}`, chartInfo);
    }

    render() {
        return (
            <section>
                <DropdownSelect asStyle='inline' config={this.state.tagsConfig} handleClick={this.dropdownTagsHandle.bind(this)} />
                <DropdownSelect asStyle='inline' tag='sort' config={this.props.sortConfig} handleClick={this.dropdownSortHandle.bind(this)} />
                <div id="douban-movies" style={{height: '400px'}}></div>
            </section>
        );
    }
}