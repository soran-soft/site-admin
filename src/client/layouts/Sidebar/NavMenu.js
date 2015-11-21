import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isChangeCurrentPath, isChangeNavMenuKey } from '../../actions/';
import { Link } from 'react-router';
import SubMenu from './SubMenu';
import config from './config';

class NavMenu extends Component {
    render() {
        let { currentPath, navMenuKey, isChangeCurrentPath, isChangeNavMenuKey } = this.props;

        return (
            <ul className="nav-menu">
                {config.map((menu, i) => {
                    return (
                        <li key={i} className={navMenuKey === i ? 'active' : ''}>
                            {menu.path && 
                                <Link to={menu.path} 
                                    onClick={() => {
                                        isChangeNavMenuKey(i);
                                        isChangeCurrentPath(menu.path);
                                    }}>
                                    <i className={'iconfont ' + menu.icon}></i>
                                    {menu.text}
                                </Link>
                            }
                            
                            {!menu.path && 
                                <a href="javascript:;" onClick={() => isChangeNavMenuKey(i)}>
                                    <i className={'iconfont ' + menu.icon}></i>
                                    {menu.text}
                                    <i className="iconfont icon-angleleft"></i>
                                </a>
                            }

                            {menu.items && <SubMenu navKey={i} items={menu.items} />}
                        </li>
                    );
                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);