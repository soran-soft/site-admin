if (process.env.BROWSER) {
    require('./table.scss');
}

import React, { Component, PropTypes } from 'react';

export class Table extends Component {
    static propTypes = {
        asStyle: PropTypes.string,
        config: PropTypes.shape({
            title: PropTypes.array,
            data: PropTypes.array   // [{}]
        })
    }

    render() {
        let { config, asStyle } = this.props;

        if (!asStyle) {
            asStyle = '';
        }

        if (!config) {
            config = {
                title: [],
                data: []
            };
        } else {
            if (!config.title) {
                config.title = [];
            }
            if (!config.data) {
                config.data = [];
            }
        }

        return (
            <table className={'as-table ' + asStyle}>
                <thead>
                    <tr>
                        {config.title.map((v, i) => <th key={i}>{v}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {config.data.map((v, i) => {
                        return (
                            <tr key={i}>
                                {Object.keys(v).map((key, j) => <td key={j}>{v[key]}</td>)}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}
