'use strict';

class Library {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/library.getArtists
     * @return {Promise}
     */
    getArtists(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'library.getArtists'
        });
    }

}

module.exports = Library;
