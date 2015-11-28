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

    state = {
        hide: false
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

    handleHide() {
        let dContent = document.getElementById('admin-content'),
            hide = this.state.hide;

        this.setState({
            hide: !hide
        });

        dContent.style.marginLeft = (!hide ? '.4rem' : '2.25rem');
    }

    render() {
        let { msg, path, navKey, config } = this.props;
        let hide = this.state.hide;

        return (
            <aside className={'admin-sidebar ' + (hide ? 'hide' : '')}>
                <h1 className="title">
                    <Link to="/">DataCenter</Link>
                    <i className={'fa fa-' + (hide ? 'indent' : 'outdent')} onClick={this.handleHide.bind(this)}></i>
                </h1>

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
