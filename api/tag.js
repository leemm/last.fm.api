'use strict';

class Tag {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/tag.getInfo
     * @return {Promise}
     */
    getInfo(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'tag.getInfo'
        });
    }

    /**
     * http://www.last.fm/api/show/tag.getSimilar
     * @return {Promise}
     */
    getSimilar(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'tag.getSimilar'
        });
    }

    /**
     * http://www.last.fm/api/show/tag.getTopAlbums
     * @return {Promise}
     */
    getTopAlbums(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'tag.getTopAlbums'
        });
    }

    /**
     * http://www.last.fm/api/show/tag.getTopArtists
     * @return {Promise}
     */
    getTopArtists(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'tag.getTopArtists'
        });
    }

    /**
     * http://www.last.fm/api/show/tag.getTopTags
     * @return {Promise}
     */
    getTopTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'tag.getTopTags'
        });
    }

    /**
     * http://www.last.fm/api/show/tag.getTopTracks
     * @return {Promise}
     */
    getTopTracks(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'tag.getTopTracks'
        });
    }

    /**
     * http://www.last.fm/api/show/tag.getWeeklyChartList
     * @return {Promise}
     */
    getWeeklyChartList(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'tag.getWeeklyChartList'
        });
    }

}

module.exports = Tag;
