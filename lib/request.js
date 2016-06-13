'use strict';

require('string-format-js');

const Helpers = require('./helpers'),
    http_request = require('request');

class Request {

    constructor() { }

    /**
     * Standard HTTP GET
     * @param  {Object} config
     * @param  {Object} opts
     * @param  {Boolean} requiresSignature (optional)
     * @return {Promise}
     */
    get(config, opts, requiresSignature) {

        const helpers = new Helpers(config);
        helpers.debug(opts, requiresSignature);

        return new Promise((resolve, reject) => {

            http_request(
                {
                    url: helpers.rootUrl(opts, requiresSignature)
                },
                ( err, res, body ) => {
                    body = body && body.indexOf('{') > -1 ? JSON.parse(body) : {};

                    let error = helpers.error(err, res, body);
                    if (error){ reject(error); }else{ resolve(body); }
                }
            );

        });

    }

    /**
     * Standard HTTP POST
     * @param  {Object} config
     * @param  {Object} opts
     * @return {Promise}
     */
    post(config, opts) {

    }

}

module.exports = Request;
