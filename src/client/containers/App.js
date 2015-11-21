import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isChangeCurrentPath } from '../actions/';
import Header from '../components/Header/';
import Sidebar from '../components/Sidebar/';
import Footer from '../components/Footer/';

class App extends Component {
    componentWillMount() {
        let { isChangeCurrentPath, location } = this.props;

        isChangeCurrentPath(location.pathname);
    }

    render() {
        return (
            <div className="admin-main">
                <Header />
                <Sidebar />
                <section className="admin-content">
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
        isChangeCurrentPath
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);