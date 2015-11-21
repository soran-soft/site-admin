import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isChangeCurrentPath, isChangeNavMenuKey } from '../../actions/';
import { Link } from 'react-router';
import NavMenu from './NavMenu';

class SubMenu extends Component {
    constructor(props) {
        super(props);

        this.displayKey = -1;
    }

    componentDidMount() { // 首次打开网页时，如何url是子菜单项，让其展开
        let { isChangeNavMenuKey } = this.props;

        if (this.displayKey >= 0) {
            isChangeNavMenuKey(this.displayKey);
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
        let html = this.renderHtml();

        return (
            <ul className="sub-menu">
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