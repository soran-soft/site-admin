import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isChangeCurrentPath } from '../../actions/';
import { Link } from 'react-router';
import NavMenu from './NavMenu';

class SubMenu extends Component {
    render() {
        let { items, currentPath, isChangeCurrentPath } = this.props;

        return (
            <ul className="sub-menu">
                {items.map((sub, i) => {
                    return (
                        <li key={i} className={sub.path === currentPath ? 'active' : ''}>
                            <Link to={sub.path}
                                onClick={() => isChangeCurrentPath(sub.path)}>{sub.text}</Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPath: state.currentPath
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        isChangeCurrentPath
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);