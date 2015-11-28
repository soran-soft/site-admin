if (process.env.BROWSER) {
    require('./table.scss');
}

import React, { Component, PropTypes } from 'react';

export class Table extends Component {
    static propTypes = {
        asStyle: PropTypes.string,
        config: PropTypes.shape({
            title: PropTypes.array.isRequired,
            data: PropTypes.array.isRequired   // [{}]
        }).isRequired
    }

    render() {
        let { config, asStyle } = this.props;

        if (!asStyle) {
            asStyle = '';
        }

        return (
            <table className={'as-table ' + asStyle}>
                <thead>
                    <tr>
                        {config.title.length > 0 && config.title.map((v, i) => <th key={i}>{v}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {config.data.length > 0 && config.data.map((v, i) => {
                        return (
                            <tr key={i}>
                                <td>{v.title}</td>
                                <td>{v.rate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}
