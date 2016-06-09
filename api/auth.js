'use strict';

class Auth {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key];  });
    }

    /**
     * Convenience method for getting last.fm auth url
     * @param  {String} returnUrl (optional, default to http://localhost:8085/authenticated if not supplied)
     * @return {String}
     */
    webAuthUrl(returnUrl) {
        returnUrl = returnUrl || 'http://localhost:8085/authenticated';

        return 'http://www.last.fm/api/auth/?api_key=' + this.opts.options.apiKey + '&cb=' + encodeURI(returnUrl);
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
