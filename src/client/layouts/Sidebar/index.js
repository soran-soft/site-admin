if (process.env.BROWSER) {
    require('./sidebar.scss');
}

import React, { Component } from 'react';
import { Link } from 'react-router';
import NavItem from './NavItem';
import SubItem from './SubItem';

export default class Sidebar extends Component {
    static defaultProps = {
        config: require('./config')
    }

    handleDashboard(path, msg, key) {
        let { changePath, changeNavKey } = this.props;

        changePath(path, msg);
        changeNavKey(key);
    }

    handleNavItem(key) {
        this.props.changeNavKey(key);
    }

    handleSubItem(path, msg) {
        this.props.changePath(path, msg);
    }

    render() {
        let { msg, path, navKey, config } = this.props;

        return (
            <aside className="admin-sidebar">
                <ul className="nav-menu">
                    <li className={(navKey === 999) ? 'active' : ''}>
                        <Link to="/" 
                            onClick={() => {
                                this.handleDashboard('/', 'Dashboard', 999);
                            }}>
                            <i className="fa fa-tachometer"></i>
                            Dashboard
                        </Link>
                    </li>

                    {config.map((pv, pi) => {
                        return (
                            <NavItem key={pi}
                                index={pi}
                                msg={pv.msg}
                                icon={pv.icon} 
                                height={(navKey === pi) ? 40*pv.items.length : 0} 
                                handleClick={this.handleNavItem.bind(this)}>

                                {pv.items.map((cv, ci) => 
                                    <SubItem key={ci} 
                                        {...cv} 
                                        isActive={cv.path === path}
                                        handleClick={this.handleSubItem.bind(this)} />
                                )}

                            </NavItem>
                        );
                    })}
                </ul>
            </aside>
        );
    }
}
