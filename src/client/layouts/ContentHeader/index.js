import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../components/Dropdown/';

class ContentHeader extends Component {
    dropdownHandle(i) {
        console.log(i);
    }

    render() {
        let { text } = this.props;
        let config = {
            title: '电影',
            items: [{
                msg: '剧情'
            }, {
                path: '/line/1',
                msg: 'line-1'
            }]
        };

        return (
            <header className="admin-content-header">
                <h1 className="title">{text}</h1>
                <Dropdown config={config} handleClick={this.dropdownHandle.bind(this)} />
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