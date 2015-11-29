if (process.env.BROWSER) {
    require('./dropdown.scss');
}

export default {
    DropdownLink: require('./Link'),
    DropdownSelect: require('./Select')
}