if (process.env.BROWSER) {
    require('./douban.scss');
}

import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMovie, fetchTags } from '../../actions/douban';
import { DropdownSelect } from '../../components/Dropdown/';
import { Table } from '../../components/Table/';
import chart from './kit/chart';

class DoubanMovies extends Component {
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
        aboutChart: { // 图表的图例及图表类型
            name: '评分',
            type: 'bar'
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            table: {
                title: ['影片名称', '豆瓣评分'],
                data: []
            }
        }
    }

    componentWillMount() {
        this.props.fetchTags();
    }

    componentDidMount() {
        let { aboutChart, keywords, fetchMovie } = this.props;

        let renderChart,
            chartInfo = {
                ...aboutChart,
                ...keywords
            };

        fetchMovie(keywords.tag, keywords.sort, function () {
            renderChart = chart.init('douban-movies');
        }, function (movie) {
            chart.output(renderChart, chartInfo, movie);
            
            let table = this.state.table;
            table.data = movie.map(v => { 
                return { title: v.title, rate: v.rate };
            });
            this.setState({ table });
        }.bind(this));
    }

    dropdownTagsHandle(tag) {
        let { aboutChart, keywords, fetchMovie } = this.props;

        if (keywords.tag !== tag) {
            let renderChart,
                chartInfo = {
                    ...aboutChart,
                    ...keywords
                };

            fetchMovie(tag, keywords.sort, function () {
                renderChart = chart.init('douban-movies');
            }, function (movie) {
                chart.output(renderChart, chartInfo, movie);
                
                let table = this.state.table;
                table.data = movie.map(v => { 
                    return { title: v.title, rate: v.rate };
                });
                this.setState({ table });
            }.bind(this));
        }
    }
    
    dropdownSortHandle(sort) {
        let { aboutChart, keywords, fetchMovie } = this.props;

        if (keywords.sort !== sort) {
            let renderChart,
                chartInfo = {
                    ...aboutChart,
                    ...keywords
                };

            fetchMovie(keywords.tag, sort, function () {
                renderChart = chart.init('douban-movies');
            }, function (movie) {
                chart.output(renderChart, chartInfo, movie);
                
                let table = this.state.table;
                table.data = movie.map(v => { 
                    return { title: v.title, rate: v.rate };
                });
                this.setState({ table });
            }.bind(this));
        }
    }

    render() {
        let { tags, keywords } = this.props,
            tagsConfig = {
            title: keywords.tag,
            items: tags
        };

        return (
            <section>
                <DropdownSelect asStyle="inline" config={tagsConfig} handleClick={this.dropdownTagsHandle.bind(this)} />
                <DropdownSelect asStyle="inline" tag='sort' config={this.props.sortConfig} handleClick={this.dropdownSortHandle.bind(this)} />
                
                <div id="douban-movies" style={{height: '400px', width: '100%'}}></div>

                <Table asStyle="df-douban-table" config={this.state.table} />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        tags: state.douban.tags,
        keywords: state.douban.keywords
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchMovie,
        fetchTags
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DoubanMovies);
