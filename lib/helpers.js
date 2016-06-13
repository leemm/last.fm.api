'use strict';

const colors = require('colors'),
    _ = require('lodash'),
    url = require('url'),
    qs = require('querystring');

class Helpers {

    /**
     * Default options
     * @param  {Object} config
     */
    constructor(config) {
        this.options = config && config.options ? config.options : {};
        this.url = config && config.url ? config.url : '';
        this.defaults = config && config.defaults ? config.defaults : {};
    }

    /**
     * check for API error
     * @param  {Object} err
     * @param  {Object} res
     * @param  {Object} body
     * @return {Object}
     */
    error(err, res, body) {

        let newError = (code, message) => {
            let err = new Error(message);
            err.error = code;
            err.text = message;
            return err;
        };

        try {

            if (err) throw err;

            if (res.statusCode !== 200){
                if (body.error){
                    throw newError(body.error, body.message);
                }else{
                    throw newError(-1, res.statusMessage);
                }
            }

        } catch(reterror) {
            return reterror;
        }
    }

    /**
     * Convenience method for getting last.fm signature for api calls that require it
     * @param  {Object} opts (various options, can use username/password combination for mobile apps or token for web apps, see examples)
     * @return {String}
     */
    // signature(opts) {

    //     let base = [
    //         { 'api_key': this.opts.options.apiKey },
    //         { 'method': opts.method }
    //     ];

    //     if (opts.username && opts.password){
    //         base = base.concat([ { 'password': opts.password }, { 'username': opts.username } ]);
    //     }else if (opts.token){
    //         base = base.concat([ { 'token': opts.token } ]);
    //     }

    //     // "flatten" array of objecs
    //     base = base.map(key => { return [ Object.keys(key)[0], key[Object.keys(key)[0]] ]; }).sort();

    //     // Absolutely ensure utf-8
    //     let finalString = Buffer.from(_.flatten(base).join('') + this.opts.options.apiSecret).toString('utf8');

    //     if (this.opts.options.debug && this.opts.options.debug === true){ console.log('signature', finalString.cyan); }

    //     return md5(finalString);
    // }

    /**
     * url to request
     * @param  {Object} opts
     * @param  {Boolean} requiresSignature (optional)
     * @return {String}
     */
    rootUrl(opts, requiresSignature) {

        requiresSignature = requiresSignature || false;

        opts = this.values(opts);

        return this.url.format(
            opts.filter,
            opts.method,
            opts.api_key,
            opts.format
        );

    }

    /**
     * get default values for the request URL
     * @param  {Object} opts
     * @return {Object}
     */
    values(opts) {

        if (!opts){ return Object.assign( {}, this.defaults, { method: '' } ); }

        let filter = opts.filter ? Object.keys(opts.filter).map( key => { return '%s=%s'.format(key, encodeURIComponent(opts.filter[key])); }).join('&') + '&' : '';

        return Object.assign( {}, this.defaults, opts, { filter : filter } );

    }

    /**
     * Debugging to console if { debug: true } supplied in api init
     * @param  {Object} opts current options for request
     * @param  {Boolean} requiresSignature (optional)
     */
    debug(opts, requiresSignature){

        if (this.options.debug && this.options.debug === true){
            const api_url = this.rootUrl(opts, requiresSignature),
                parts = url.parse(api_url),
                query = qs.parse(parts.query);

            console.log(api_url.cyan);

            console.log(Object.keys(query).map(key => { return key + ' = ' + query[key]; }).join('\n').blue);
        }

    }

}

module.exports = Helpers;
