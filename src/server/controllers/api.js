import initialState from '../mock/initialState';

export default {
    api: function *(next) {
        this.body = 'api';
    },

    initialState: function *(next) {
        this.body = initialState;
    },

    douban: function *(next) {
        this.body = 
        yield fetch('http://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            });
    }
};