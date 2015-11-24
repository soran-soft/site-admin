import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContentHeader extends Component {
    render() {
        let { text } = this.props;

        return (
            <header className="admin-content-header">
                <h1 className="title">{text}</h1>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        text: state.pathInfo.text
    };
}

export default connect(mapStateToProps)(ContentHeader);