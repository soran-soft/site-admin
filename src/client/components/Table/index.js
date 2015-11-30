if (process.env.BROWSER) {
    require('./table.scss');
}

import React, { Component, PropTypes } from 'react';

export class Table extends Component {
    static propTypes = {
        asStyle: PropTypes.string,
        config: PropTypes.shape({
            caption: PropTypes.string,
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
            config = {};
        }

        return (
            <table className={'as-table ' + asStyle}>
                {config.caption && <caption>{config.caption}</caption>}
                {config.title && 
                    <thead>
                        <tr>
                            {config.title.map((v, i) => <th key={i}>{v}</th>)}
                        </tr>
                    </thead>
                }
                {config.data && 
                    <tbody>
                        {config.data.map((v, i) => {
                            return (
                                <tr key={i}>
                                    {Object.keys(v).map((key, j) => <td key={j}>{v[key]}</td>)}
                                </tr>
                            );
                        })}
                    </tbody>
                }
            </table>
        );
    }
}
