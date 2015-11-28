if (process.env.BROWSER) {
    require('./header.scss');
}

import React, { Component } from 'react';
import { Link } from 'react-router';
import { DropdownLink } from '../../components/Dropdown/';

class Header extends Component {
    static defaultProps = {
        config: {
            title: '用户名',
            items: [{
                key: 0,
                msg: '豆瓣电影',
                path: '/douban/movies'
            }, {
                key: 1,
                msg: '用户信息',
                path: '/user'
            }, {
                key: 2,
                msg: '设置中心',
                path: '/settings'
            }]
        }
    }
    
    render() {
        return (
            <header className="admin-header">
                <DropdownLink type="fuse" preIcon="fa-user" asStyle="user-dropdown" config={this.props.config} />
            </header>
        );
    }
}

export default Header;