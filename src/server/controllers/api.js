import initialState from '../mock/initialState';

export default {
    api: function *(next) {
        this.body = 'api';
    },

    initialState: function *(next) {
        this.body = initialState;
    }
};