'use strict';

class Artist {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/artist.getSimilar
     * @return {Promise}
     */
    getSimilar(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.getSimilar'
        });
    }

}

module.exports = Artist;