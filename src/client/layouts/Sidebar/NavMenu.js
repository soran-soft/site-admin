import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePath, changeNavKey } from '../../actions/';
import { Link } from 'react-router';
import SubMenu from './SubMenu';
import config from './config';

class NavMenu extends Component {
    render() {
        let { currentPath, navKey, changePath, changeNavKey } = this.props;

        return (
            <ul className="nav-menu">
                {config.map((menu, i) => {
                    let flag = (navKey === i);

                    return (
                        <li key={i} className={flag ? 'active' : ''}>
                            {menu.path && 
                                <Link to={menu.path} 
                                    onClick={() => {
                                        changeNavKey(i);
                                        changePath(menu.path, menu.text);
                                    }}>
                                    <i className={'iconfont ' + menu.icon}></i>
                                    {menu.text}
                                </Link>
                            }
                            
                            {!menu.path && 
                                <a href="javascript:;" onClick={() => changeNavKey(i)}>
                                    <i className={'iconfont ' + menu.icon}></i>
                                    {menu.text}
                                    <i className={'iconfont icon-angle' + (flag ? 'down' : 'left')}></i>
                                </a>
                            }

                            {menu.items && <SubMenu navIndex={i} items={menu.items} />}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPath: state.pathInfo.path,
        navKey: state.navKey
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePath,
        changeNavKey
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);