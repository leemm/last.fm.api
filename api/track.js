'use strict';

class Track {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/track.addTags
     * @return {Promise}
     */
    addTags(opts) {
        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.addTags'
        });
    }

    /**
     * http://www.last.fm/api/show/track.getCorrection
     * @return {Promise}
     */
    getCorrection(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.getCorrection'
        });
    }

    /**
     * http://www.last.fm/api/show/track.getInfo
     * @return {Promise}
     */
    getInfo(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.getInfo'
        });
    }

    /**
     * http://www.last.fm/api/show/track.getSimilar
     * @return {Promise}
     */
    getSimilar(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.getSimilar'
        });
    }

    /**
     * http://www.last.fm/api/show/track.getTags
     * @return {Promise}
     */
    getTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.getTags'
        });
    }

    /**
     * http://www.last.fm/api/show/track.getTopTags
     * @return {Promise}
     */
    getTopTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.getTopTags'
        });
    }

    /**
     * http://www.last.fm/api/show/track.getTopTags
     * @return {Promise}
     */
    getTopTags(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.getTopTags'
        });
    }

    /**
     * http://www.last.fm/api/show/track.love
     * @return {Promise}
     */
    love(opts) {
        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.love'
        });
    }

    /**
     * http://www.last.fm/api/show/track.removeTag
     * @return {Promise}
     */
    removeTag(opts) {
        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.removeTag'
        });
    }

    /**
     * http://www.last.fm/api/show/track.scrobble
     * @return {Promise}
     */
    scrobble(opts) {

        // take array of tracks and convert to format required by API
        opts.tracks = opts && opts.tracks && !Array.isArray(opts.tracks) ? [ opts.tracks ] : (opts.tracks || []);

        for (let i = 0;i < opts.tracks.length; i++){
            for (let key in opts.tracks[i]){
                opts[key + '[' + i + ']'] = opts.tracks[i][key];
            }
        }

        delete opts.tracks;

        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.scrobble'
        });
    }

    /**
     * http://www.last.fm/api/show/track.search
     * @return {Promise}
     */
    search(opts) {
        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.search'
        });
    }

    /**
     * http://www.last.fm/api/show/track.unlove
     * @return {Promise}
     */
    unlove(opts) {
        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.unlove'
        });
    }

    /**
     * http://www.last.fm/api/show/track.updateNowPlaying
     * @return {Promise}
     */
    updateNowPlaying(opts) {
        return this.post(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'track.updateNowPlaying'
        });
    }

}

module.exports = Track;
