import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePath, changeNavKey } from '../../actions/main';
import { Link } from 'react-router';
import SubMenu from './SubMenu';

class NavMenu extends Component {
    static defaultProps = {
        config: require('./config')
    }

    render() {
        let { currentPath, navKey, changePath, changeNavKey, config } = this.props;

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
                                        changePath(menu.path, menu.msg);
                                    }}>
                                    <i className={'iconfont ' + menu.icon}></i>
                                    {menu.msg}
                                </Link>
                            }
                            
                            {!menu.path && 
                                <a href="javascript:;" onClick={() => changeNavKey(i)}>
                                    <i className={'iconfont ' + menu.icon}></i>
                                    {menu.msg}
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
        currentPath: state.main.path,
        navKey: state.main.navKey
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePath,
        changeNavKey
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);