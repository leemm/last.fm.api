'use strict';

class Artist {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/artist.addTags
     * @return {Promise}
     */
    addTags(opts) {
        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.addTags'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.getCorrection
     * @return {Promise}
     */
    getCorrection(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.getCorrection'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.getInfo
     * @return {Promise}
     */
    getInfo(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.getInfo'
        });
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

    /**
     * http://www.last.fm/api/show/artist.getTags
     * @return {Promise}
     */
    getTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.getTags'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.getTopAlbums
     * @return {Promise}
     */
    getTopAlbums(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.getTopAlbums'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.getTopTags
     * @return {Promise}
     */
    getTopTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.getTopTags'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.getTopTracks
     * @return {Promise}
     */
    getTopTracks(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.getTopTracks'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.removeTag
     * @return {Promise}
     */
    removeTag(opts) {
        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.removeTag'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.search
     * @return {Promise}
     */
    search(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'artist.search'
        });
    }

}

module.exports = Artist;
