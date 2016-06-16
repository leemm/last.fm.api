'use strict';

class User {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/user.getArtistTracks
     * @return {Promise}
     */
    getArtistTracks(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getArtistTracks'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getFriends
     * @return {Promise}
     */
    getFriends(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getFriends'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getInfo
     * @return {Promise}
     */
    getInfo(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getInfo'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getLovedTracks
     * @return {Promise}
     */
    getLovedTracks(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getLovedTracks'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getPersonalTags
     * @return {Promise}
     */
    getPersonalTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getPersonalTags'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getRecentTracks
     * @return {Promise}
     */
    getRecentTracks(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getRecentTracks'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getTopAlbums
     * @return {Promise}
     */
    getTopAlbums(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getTopAlbums'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getTopArtists
     * @return {Promise}
     */
    getTopArtists(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getTopArtists'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getTopTags
     * @return {Promise}
     */
    getTopTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getTopTags'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getTopTracks
     * @return {Promise}
     */
    getTopTracks(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getTopTracks'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getWeeklyAlbumChart
     * @return {Promise}
     */
    getWeeklyAlbumChart(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getWeeklyAlbumChart'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getWeeklyArtistChart
     * @return {Promise}
     */
    getWeeklyArtistChart(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getWeeklyArtistChart'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getWeeklyChartList
     * @return {Promise}
     */
    getWeeklyChartList(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getWeeklyChartList'
        });
    }

    /**
     * http://www.last.fm/api/show/user.getWeeklyTrackChart
     * @return {Promise}
     */
    getWeeklyTrackChart(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'user.getWeeklyTrackChart'
        });
    }

}

module.exports = User;
