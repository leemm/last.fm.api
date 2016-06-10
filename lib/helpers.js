'use strict';

const colors = require('colors');

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
        try {

            if (err) throw err;

            if (res.statusCode !== 200){
                if (body.error){
                    throw new Error(body);
                }else{
                    throw new Error(res.statusMessage);
                }
            }

        } catch(reterror) {
            return reterror;
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
