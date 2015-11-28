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
        let { config: { title, data }, asStyle } = this.props;

        if (!asStyle) {
            asStyle = '';
        }

        return (
            <table className={'as-table ' + asStyle}>
                <thead>
                    <tr>
                        {title.map((v, i) => <th key={i}>{v}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((v, i) => {
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
