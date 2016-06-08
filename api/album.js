'use strict';

class Album {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/album.getInfo
     * @return {Promise}
     */
    getInfo(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'album.getInfo'
        });
    }

    /**
     * http://www.last.fm/api/show/album.search
     * @return {Promise}
     */
    search(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'album.search'
        });
    }

}

module.exports = Album;