'use strict';

const md5 = require('md5'),
    _ = require('lodash');

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
     * @return {String}
     */
    webAuthUrl(returnUrl) {
        returnUrl = returnUrl || 'http://localhost:8085/authenticated';

        return 'http://www.last.fm/api/auth/?api_key=' + this.opts.options.apiKey + '&cb=' + encodeURI(returnUrl);
    }

    /**
     * Convenience method for getting last.fm signature for api calls that require it
     * @param  {Object} opts (various options, can use username/password combination for mobile apps or token for web apps, see examples)
     * @return {String}
     */
    signature(opts) {

        let base = [
            { 'api_key': this.opts.options.apiKey },
            { 'method': opts.method }
        ];

        if (opts.username && opts.password){
            base = base.concat([ { 'password': opts.password }, { 'username': opts.username } ]);
        }else if (opts.token){
            base = base.concat([ { 'token': opts.token } ]);
        }

        // "flatten" array of objecs
        base = base.map(key => { return [ Object.keys(key)[0], key[Object.keys(key)[0]] ]; }).sort();

        // Absolutely ensure utf-8
        let finalString = Buffer.from(_.flatten(base).join('') + this.opts.options.apiSecret).toString('utf8');

        if (this.opts.options.debug && this.opts.options.debug === true){ console.log('signature', finalString.cyan); }

        return md5(finalString);
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
