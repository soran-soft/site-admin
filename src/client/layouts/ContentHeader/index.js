if (process.env.BROWSER) {
    require('./content-header.scss');
}

import React, { Component } from 'react';

export default class ContentHeader extends Component {
    render() {
        return (
            <header className="admin-content-header">
                <h1 className="title">{this.props.msg}</h1>
            </header>
        );
    }
}