import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePath } from '../actions/';
import Header from './Header/';
import Sidebar from './Sidebar/';
import ContentHeader from './ContentHeader/';
import Footer from './Footer/';

class App extends Component {
    componentWillReceiveProps(nextProps) {
        /*if (this.props.currentPath !== nextProps.currentPath) {
            this.props.isChangeCurrentPath(nextProps);
        }*/
    }

    render() {
        return (
            <div className="admin-main">
                <Header />
                <Sidebar />
                <section className="admin-content">
                    <ContentHeader />

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
        changePath
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
