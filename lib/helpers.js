'use strict';

const colors = require('colors'),
    _ = require('lodash'),
    url = require('url'),
    qs = require('querystring'),
    md5 = require('md5'),
    XML = require('pixl-xml'),
    HTML = require('html-parse-stringify2');

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
     * @param  {Boolean} write (optional)
     * @return {String}
     */
    signature(opts, write) {

        let base = [
            { 'api_key': this.options.apiKey },
            { 'method': opts.method }
        ];

        if (this.options.username && this.options.password){
            base = base.concat([ { 'password': this.options.password }, { 'username': this.options.username } ]);
        }else if (opts.token){
            base = base.concat([ { 'token': opts.token } ]);
        }else if (opts.filter && opts.filter.token){
            base = base.concat([ { 'token': opts.filter.token } ]);
        }

        // if "write mode" i.e. POST then add the other values in filter
        if (write && opts.filter){
            for (let key in opts.filter){
                
                let toObj = {};
                toObj[key] = Array.isArray(opts.filter[key]) ? opts.filter[key].join(',') : opts.filter[key];

                base.push(toObj);

            }
        }

        // "flatten" array of objecs
        base = base.map(key => { return [ Object.keys(key)[0], key[Object.keys(key)[0]] ]; }).sort();

        // Absolutely ensure utf-8
        let finalString = Buffer.from(_.flatten(base).join('') + this.options.apiSecret).toString('utf8');

        if (this.options.debug && this.options.debug === true){ 
            console.log('signature', finalString.red); 
        }

        return md5(finalString);
    }

    /**
     * url to request
     * @param  {Object} opts
     * @param  {Boolean} write (optional)
     * @param  {Boolean} requiresSignature (optional)
     * @return {String}
     */
    rootUrl(opts, write, requiresSignature) {

        write = write || false;
        requiresSignature = requiresSignature || false;

        // write mode only requires root of API
        if (write){

            return this.url.split('?')[0] + '?format=' + this.defaults.format;

        }else{

            if (requiresSignature){ opts.api_sig = this.signature(opts); }

            opts = this.values(opts);

            // If username and password supplied i.e. for mobile apps then add them to the filter
            if (this.options.username && this.options.password){
                opts.filter += 'username=%s&password=%s&'.format(this.options.username, this.options.password);
            }

            return this.url.format(
                opts.filter,
                opts.method,
                opts.api_key,
                opts.format
            ) + (opts.api_sig ? '&api_sig=' + opts.api_sig : '');

        }

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
     * get post body for requests that require write access
     * @param  {Object} opts
     * @return {Object}
     */
    formData(opts) {

        let data = {};

        // 'flatten' object
        for (let key in opts){
            if (typeof opts[key] === 'object'){
                for (let subkey in opts[key]){
                    data[subkey] = opts[key][subkey];
                }
            }else{
                data[key] = opts[key];
            }
        }

        // Check for arrays
        for (let key in data){
            if (Array.isArray(data[key])){ data[key] = data[key].join(','); }
        }

        // If username and password supplied i.e. for mobile apps then add them to the filter
        if (this.options.username){ data.username = this.options.username; }
        if (this.options.password){ data.password = this.options.password; }

        data.api_key = this.options.apiKey;
        data.api_sig = this.signature(opts, true);

        return data;
    }

    /**
     * Take response body and cast to JSON
     * @param  {Object} body
     * @return {Object}
     */
    parseBody(body) {

        if (body && body.indexOf('<?xml') > -1){
            body = XML.parse(body);

            if (body.error){
                body.error.message = body.error._Data;
                delete body.error._Data;
            }
        }else if (body && body.indexOf('<!doctype') > -1){
            body = HTML.parse(body);
        }else if (body && body.indexOf('{') > -1){
            body = JSON.parse(body);
        }
        
        return  body || {};

    }

    /**
     * Debugging to console if { debug: true } supplied in api init
     * @param  {Object} opts current options for request
     * @param  {Boolean} write (optional)
     * @param  {Boolean} requiresSignature (optional)
     */
    debug(opts, write, requiresSignature){

        write = write || false;
        requiresSignature = requiresSignature || false;

        if (this.options.debug && this.options.debug === true){
            const api_url = this.rootUrl(opts, write, requiresSignature),
                parts = url.parse(api_url),
                query = qs.parse(parts.query),
                form = this.formData(opts, true);

            console.log('----------');

            console.log(api_url.cyan);

            if (!write){
                console.log(Object.keys(query).map(key => { return key + ' = ' + query[key]; }).join('\n').blue);
            }else{
                console.log(Object.keys(form).map(key => { return key + ' = ' + form[key]; }).join('\n').blue);
            }

            console.log('----------');
            
        }

    }

}

module.exports = Helpers;
