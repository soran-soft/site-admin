// import querystring from 'querystring';

export default {
    api: function *(next) {
        this.body = 'api';
    },

    douban: function *(next) {
        // console.log(querystring.parse(this.req._parsedUrl.query));

        let type = this.params.type,
            url = '';

        if (type === 'movie') {
            let query = this.req._parsedUrl.query; // tag, sort

            url = `http://movie.douban.com/j/search_subjects?type=movie&${query}&page_limit=20&page_start=0`;
        } else if (type === 'tags') {
            url = 'http://movie.douban.com/j/search_tags?type=movie';
        }

        this.body = yield fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            });
    }
};