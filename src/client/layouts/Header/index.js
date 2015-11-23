import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render() {
        return (
            <header className="admin-header">
                <h1 className="header-title"><Link to="/">DataCenter</Link></h1>
                <ul className="header-user select-menu">
                    <a href="javascript:;"><i className="iconfont icon-user"></i>username<i className="iconfont icon-angledown last"></i></a>
                    <li>
                        <Link to="/">xxx</Link>
                    </li>
                    <li>
                        <Link to="/">xxx</Link>
                    </li>
                    <li>
                        <Link to="/">xxx</Link>
                    </li>
                </ul>
            </header>
        );
    }
}

Header.propTypes = {
    /*increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired*/
};

export default Header;