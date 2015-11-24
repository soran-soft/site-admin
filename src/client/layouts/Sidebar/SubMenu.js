import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePath, changeNavKey } from '../../actions/';
import { Link } from 'react-router';
import NavMenu from './NavMenu';

class SubMenu extends Component {
    constructor(props) {
        super(props);

        this.height = 0;
    }

    componentDidMount() { // 首次打开网页时，如何url是子菜单项，让其展开
        let { navIndex, navKey } = this.props,
            dom = findDOMNode(this.refs.subMenu);

        this.height = dom.offsetHeight;

        if (navKey !== navIndex) {
            dom.style.height = 0;
        }
    }

    render() {
        let { items, pathInfo, navIndex, navKey, changePath } = this.props,
            style = {};

        if (this.height > 0) {
            if (navKey === navIndex) {
                style = {height: this.height};
            } else {
                style = {height: 0};
            }
        } 

        return (
            <ul className="sub-menu" ref="subMenu" style={style}>
                {items.map((sub, i) => {
                    return (
                        <li key={i} className={(sub.path === pathInfo.path) ? 'active' : ''}>
                            <Link to={sub.path}
                                onClick={() => changePath(sub.path, sub.text)}>{sub.text}</Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        pathInfo: state.pathInfo,
        navKey: state.navKey
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePath,
        changeNavKey
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);