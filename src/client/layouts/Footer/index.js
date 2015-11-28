if (process.env.BROWSER) {
    require('./footer.scss');
}

import React, { Component, PropTypes } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="admin-footer">
                <p>2015 © Web-admin by <a href="https://ansenhuang.github.io/" target="_blank">Ansenhuang</a>.</p>
            </footer>
        );
    }
}

export default Footer;