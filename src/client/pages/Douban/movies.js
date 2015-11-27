import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMovie } from '../../actions/douban';
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
        chart: { // 图表的图例及图表类型
            name: '评分',
            type: 'bar'
        }
    }

    componentDidMount() {
        let { chart: { name, type }, keywords: { tag, sort }, movies } = this.props;

        let chartInfo = {
            tag, sort, name, type
        };

        // 渲染图表
        chart('douban-movies', chartInfo, movies[`${tag}&${sort}`]);
    }

    dropdownTagsHandle(tag) {
        let { chart: { name, type }, keywords: { sort }, fetchMovie } = this.props;

        let chartInfo = {
            tag, sort, name, type
        };

        fetchMovie(tag, sort, function (movie) {
            chart('douban-movies', chartInfo, movie);
        });
    }
    
    dropdownSortHandle(sort) {
        let { chart: { name, type }, keywords: { tag }, fetchMovie } = this.props;

        let chartInfo = {
            tag, sort, name, type
        };

        fetchMovie(tag, sort, function (movie) {
            chart('douban-movies', chartInfo, movie);
        });
    }

    render() {
        let { sortConfig, tags } = this.props,
            tagsConfig = {
            title: tags[0],
            items: []
        };

        tags.forEach(v => tagsConfig.items.push({msg: v}));

        return (
            <section>
                <DropdownSelect asStyle='inline' config={tagsConfig} handleClick={this.dropdownTagsHandle.bind(this)} />
                <DropdownSelect asStyle='inline' tag='sort' config={sortConfig} handleClick={this.dropdownSortHandle.bind(this)} />
                
                <div id="douban-movies" style={{height: '400px'}}></div>

                <Table />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        tags: state.douban.tags,
        movies: state.douban.movies,
        keywords: state.douban.keywords
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchMovie
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DoubanMovies);
