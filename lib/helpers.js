'use strict';

const colors = require('colors'),
    md5 = require('js-md5');

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
        if (err) return err;

        if (res.statusCode !== 200){
            if (body.error){
                return new Error(body);
            }else{
                return new Error(res.statusMessage);
            }
        }
    }

    /**
     * url to request
     * @param  {Object} opts
     * @return {String}
     */
    rootUrl(opts) {

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
     * get last.fm signature for calls that require it
     * @param  {Object} opts
     * @return {String]}
     */
    sig(opts) {
        return md5('api_key' + opts.api_key + 'method' + opts.method + 'password' + opts.password + 'username' + opts.username);
    }

    /**
     * Debugging to console if { debug: true } supplied in api init
     * @param  {Object} opts current options for request
     */
    debug(opts){
        if (this.options.debug && this.options.debug === true){
            console.log(this.rootUrl(opts).cyan);
        }
    }

}

module.exports = Helpers;
