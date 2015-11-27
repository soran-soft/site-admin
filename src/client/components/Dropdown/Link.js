if (process.env.BROWSER) {
    require('./dropdown.scss');
}

import React, { Component, PropTypes } from 'react';

export default class DropdownLink extends Component {
    static propTypes = {
        type: PropTypes.string,                   // 下拉菜单主题样式
        asStyle: PropTypes.string,                // 自定义样式
        config: PropTypes.shape({                 
            title: PropTypes.string.isRequired,   // 按钮当前显示的标题
            items: PropTypes.arrayOf(             // 子选项
                PropTypes.shape({
                    msg: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired
                }).isRequired
            ).isRequired     
        }).isRequired
    }

    state = {
        open: false
    }

    componentDidMount() {
        document.addEventListener('click', function () {
            if (this.state.open) {
                this.setState({
                    open: false
                });
            }
        }.bind(this), false); // 这边需要给函数绑定this，不能在外面定义self，否则都会指向最后一个self
    }

    btnClick(e) {
        // e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation(); // 注意：前一行的方法不会阻止事件冒泡到上面的document，请使用本行方法

        this.setState({
            open: !this.state.open
        });
    }

    render() {
        let { config, asStyle, type } = this.props;
        let btnClick = this.btnClick.bind(this);

        if (!asStyle) {
            asStyle = '';
        }

        if (type && type === 'fuse') {
            type = 'as-dropdown-fuse ';
        } else {
            type = 'as-dropdown ';
        }

        return (
            <div className={type + asStyle}>
                <button onClick={btnClick}>{config.title}<i className="iconfont icon-sortdown"></i></button>
                <ul className={this.state.open ? 'open' : ''}>
                    {config.items.map((v, i) => {
                        return (
                            <li key={i}>
                                <a href={v.path}>{v.msg}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
