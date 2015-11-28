if (process.env.BROWSER) {
    require('./sidebar.scss');
}

import React, { Component } from 'react';
import NavMenu from './NavMenu';
import SubMenu from './SubMenu';

export default class Sidebar extends Component {
    render() {
        console.log(this.props);

        return (
            <aside className="admin-sidebar">
                <NavMenu />

                <NavMenu><li><a href="">hhhhh</a></li></NavMenu>
            </aside>
        );
    }
}
