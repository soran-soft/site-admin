if (process.env.BROWSER) {
    require('./sidebar.scss');
}

import React, { Component } from 'react';
import NavMenu from './NavMenu';

class Sidebar extends Component {
    render() {
        return (
            <aside className="admin-sidebar">
                <NavMenu />
            </aside>
        );
    }
}

export default Sidebar;