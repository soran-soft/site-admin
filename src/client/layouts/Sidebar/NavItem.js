import React, { Component } from 'react';

export default class NavItem extends Component {
    render() {
        let { index, msg, icon, height, handleClick } = this.props;

        return (
            <li className={(height > 0) ? 'active' : ''}>
                <a href="javascript:;" onClick={() => handleClick(index)}>
                    <i className={'fa ' + icon}></i>
                    {msg}
                    <i className={'last fa fa-angle-' + ((height > 0) ? 'down' : 'left')}></i>
                </a>

                <ul className="sub-menu" style={{height}}>
                    {this.props.children || ''}
                </ul>
            </li>
        );
    }
}
