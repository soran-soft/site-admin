if (process.env.BROWSER) {
    require('./dropdown.scss');
}

import React, { Component, PropTypes } from 'react';

export default class DropdownSelect extends Component {
    static propTypes = {
        type: PropTypes.string,                   // 下拉菜单主题样式
        asStyle: PropTypes.string,                // 自定义样式
        tag: PropTypes.string,                    // 出发事件需要返回的对象key值
        config: PropTypes.shape({                 
            title: PropTypes.string.isRequired,   // 按钮当前显示的标题
            items: PropTypes.array.isRequired     // 子选项 [{msg}]
        }).isRequired,
        handleClick: PropTypes.func.isRequired    // 点击选项触发的事件
    }

    state = {
        open: false,
        title: this.props.config.title
    }

    componentDidMount() {
        document.addEventListener('click', function () {
            let { open, title } = this.state;

            if (open) {
                this.setState({
                    open: false,
                    title
                });
            }
        }.bind(this), false); // 这边需要给函数绑定this，不能在外面定义self，否则都会指向最后一个self
    }

    btnClick(e) {
        // e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation(); // 注意：前一行的方法不会阻止事件冒泡到上面的document，请使用本行方法

        let { open, title } = this.state;

        this.setState({
            open: !open,
            title
        });
    }

    handleSelect(msg) {
        let { open, title } = this.state;

        this.setState({
            open,
            title: msg
        });
    }

    render() {
        let { config, handleClick, asStyle, tag, type } = this.props,
            { open, title } = this.state,
            btnClick = this.btnClick.bind(this),
            handleSelect = this.handleSelect.bind(this);

        if (!tag) {
            tag = 'msg';
        }

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
                <button onClick={btnClick}>{title}<i className="fa fa-caret-down"></i></button>
                <ul className={open ? 'open' : ''}>
                    {config.items.length > 0 && config.items.map((v, i) => {
                        return (
                            <li key={i}>
                                <a href="javascript:;"
                                    onClick={() => {
                                        handleSelect(v.msg);
                                        handleClick(v[tag]);
                                    }}>{v.msg}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
