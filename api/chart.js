'use strict';

class Chart {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/chart.getTopArtists
     * @return {Promise}
     */
    getTopArtists(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'chart.getTopArtists'
        });
    }

    /**
     * http://www.last.fm/api/show/chart.getTopTags
     * @return {Promise}
     */
    getTopTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'chart.getTopTags'
        });
    }

    /**
     * http://www.last.fm/api/show/chart.getTopTracks
     * @return {Promise}
     */
    getTopTracks(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'chart.getTopTracks'
        });
    }

}

module.exports = Chart;
