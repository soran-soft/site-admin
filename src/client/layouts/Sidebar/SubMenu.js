import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isChangeCurrentPath, isChangeNavMenuKey } from '../../actions/';
import { Link } from 'react-router';
import NavMenu from './NavMenu';

class SubMenu extends Component {
    constructor(props) {
        super(props);

        this.displayKey = -1;
        this.height = 0;
    }

    componentDidMount() { // 首次打开网页时，如何url是子菜单项，让其展开
        let { isChangeNavMenuKey } = this.props;
        let dom = findDOMNode(this.refs.subMenu);

        this.height = dom.offsetHeight;

        if (this.displayKey >= 0) {
            isChangeNavMenuKey(this.displayKey);
        } else {
            dom.style.height = 0;
        }
    }

    renderHtml() {
        let { items, currentPath, isChangeCurrentPath, navKey } = this.props;
        
        return items.map((sub, i) => {
            let isActive = (sub.path === currentPath);

            if (isActive) {
                this.displayKey = navKey;
            }

            return (
                <li key={i} className={isActive ? 'active' : ''}>
                    <Link to={sub.path}
                        onClick={() => isChangeCurrentPath(sub.path)}>{sub.text}</Link>
                </li>
            );
        });
    }

    render() {
        let { navKey, navMenuKey } = this.props;
        let html = this.renderHtml();
        let style = {};

        if (this.height > 0) {
            if (navKey === navMenuKey) {
                style = {height: this.height, overflow: 'visible'};
            } else {
                style = {height: 0, overflow: 'hidden'};
            }
        } 

        return (
            <ul className="sub-menu" ref="subMenu" style={style}>
                {html}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPath: state.currentPath,
        navMenuKey: state.navMenuKey
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        isChangeCurrentPath,
        isChangeNavMenuKey
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);