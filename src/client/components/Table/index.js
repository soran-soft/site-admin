if (process.env.BROWSER) {
    require('./table.scss');
}

import React, { Component, PropTypes } from 'react';

export class Table extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <table className="as-table">
                <thead>
                    <tr>
                        <th>00000000000001</th>
                        <th>00000000000002</th>
                        <th>00000000000003</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>00000000000001</td>
                        <td>00000000000002</td>
                        <td>00000000000003</td>
                    </tr>
                    <tr>
                        <td>00000000000001</td>
                        <td>00000000000002</td>
                        <td>00000000000003</td>
                    </tr>
                    <tr>
                        <td>00000000000001</td>
                        <td>00000000000002</td>
                        <td>00000000000003</td>
                    </tr>
                    <tr>
                        <td>00000000000001</td>
                        <td>00000000000002</td>
                        <td>00000000000003</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
