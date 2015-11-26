import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContentHeader extends Component {
    render() {
        let { msg } = this.props;

        return (
            <header className="admin-content-header">
                <h1 className="title">{msg}</h1>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        msg: state.main.msg
    };
}

export default connect(mapStateToProps)(ContentHeader);