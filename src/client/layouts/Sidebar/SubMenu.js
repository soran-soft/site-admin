import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePath, changeNavKey } from '../../actions/main';
import { Link } from 'react-router';
import NavMenu from './NavMenu';

class SubMenu extends Component {
    render() {
        let { items, main: { path, navKey }, navIndex, changePath } = this.props,
            style = (navIndex === navKey) ? { height: 40*items.length } : { height: 0 };

        return (
            <ul className="sub-menu" ref="subMenu" style={style}>
                {items.map((sub, i) => {
                    return (
                        <li key={i} className={(sub.path === path) ? 'active' : ''}>
                            <Link to={sub.path}
                                onClick={() => changePath(sub.path, sub.msg)}>{sub.msg}</Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        main: state.main
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePath,
        changeNavKey
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);