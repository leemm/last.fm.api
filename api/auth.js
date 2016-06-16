'use strict';

const Helpers = require('../lib/helpers'),
    http_request = require('request');

class Auth {

    constructor(opts, get, post) {
        this.opts = {};
        this.get = get;
        this.post = post;

        Object.keys(opts).map(key => { this.opts[key] = opts[key]; });
    }

    /**
     * Convenience method for getting last.fm auth url
     * @param  {String} returnUrl (optional, default to http://localhost:8085/authenticated if not supplied)
     * @param  {String} token (optional)
     * @return {String}
     */
    webAuthUrl(returnUrl, token) {
        returnUrl = returnUrl || 'http://localhost:8085/authenticated';

        return 'http://www.last.fm/api/auth/?api_key=' + this.opts.options.apiKey + (!token ? '&cb=' + encodeURI(returnUrl) : '') + (token ? '&token=' + token : '');
    }

    /**
     * Remotely get authorisation for this user (only works if you're currently logged in!)
     * http://www.last.fm/api/desktopauth -> Point 3
     * @param  {String} token
     * @return {Promise}
     */
    getAuthorization(token) {
        const helpers = new Helpers(this.opts),
            url = this.webAuthUrl('', token);

        console.log(url.cyan);

        return new Promise((resolve, reject) => {

            http_request(
                {
                    url: url
                },
                ( err, res, body ) => {
                    body = helpers.parseBody(body);

                    let requiresLogin = body && require('util').inspect(body, {showHidden: false, depth: null}).toString().toLowerCase().indexOf('login') > -1;

                    let error = helpers.error(err, res, body);
                    if (error){ reject(error); }else{ resolve({ requiresLogin: requiresLogin, token: token }); }
                }
            );

        });
    }

    /**
     * http://www.last.fm/api/show/artist.getMobileSession
     * @return {Promise}
     */
    getMobileSession(opts) {
        return this.post(this.opts, {
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
        }, true);
    }

    /**
     * http://www.last.fm/api/show/artist.getToken
     * @return {Promise}
     */
    getToken(opts) {
        return this.get(this.opts, {
            filter: Object.assign(opts, {}),
            method: 'auth.getToken'
        }, true);
    }

}

module.exports = Auth;
