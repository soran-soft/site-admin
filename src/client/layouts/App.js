if (process.env.BROWSER) {
    require('./app.scss');
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePath, changeNavKey } from '../actions/main';
import Header from './Header/';
import Sidebar from './Sidebar/';
import ContentHeader from './ContentHeader/';
import Footer from './Footer/';

class App extends Component {
    render() {
        let { main, changePath, changeNavKey } = this.props;

        return (
            <div className="admin-main">
                <Header />
                <Sidebar {...main} changePath={changePath} changeNavKey={changeNavKey} />
                <section id="admin-content" className="admin-content">
                    <ContentHeader msg={main.msg} />

                    {this.props.children || ''}
                </section>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePath,
        changeNavKey
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
