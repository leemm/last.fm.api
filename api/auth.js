'use strict';

class Auth {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * http://www.last.fm/api/show/artist.getMobileSession
     * @return {Promise}
     */
    getMobileSession(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'auth.getMobileSession'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.getSession
     * @return {Promise}
     */
    getSession(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'auth.getSession'
        });
    }

    /**
     * http://www.last.fm/api/show/artist.getToken
     * @return {Promise}
     */
    getToken(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'auth.getToken'
        });
    }

}

module.exports = Auth;
