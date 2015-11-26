if (process.env.BROWSER) {
    require('./dropdown.scss');
}

import React, { Component } from 'react';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    componentDidMount() {
        self = this;

        document.addEventListener('click', function (e) {console.log(self.state.open);
            if (self.state.open) {
                self.setState({
                    open: false
                });
            }console.log(self.state.open);
        }, false);
    }

    btnClick(e) {
        // e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation(); // 注意：前一行的方法不会阻止事件冒泡到上面的document，请使用本行方法

        this.setState({
            open: !this.state.open
        });
    }

    render() {
        let { config, handleClick, asStyle } = this.props;
        let btnClick = this.btnClick.bind(this);

        return (
            <div className={'as-dropdown ' + (asStyle ? asStyle : '')}>
                <button onClick={btnClick}>{config.title}<i className="iconfont icon-sortdown"></i></button>
                <ul className={this.state.open ? 'open' : ''}>
                    {config.items.map((v, i) => {
                        return (
                            <li key={i}>
                                <a href="javascript:;"
                                    onClick={() => {
                                        handleClick(i);
                                    }}>{v.msg}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
