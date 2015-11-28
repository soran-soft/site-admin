import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SubItem extends Component {
    render() {
        let { path, msg, isActive, handleClick } = this.props;
            
        return (
            <li className={isActive ? 'active' : ''}>
                <Link to={path}
                    onClick={() => handleClick(path, msg)}>
                    {msg}
                </Link>
            </li>
        );
    }
}
