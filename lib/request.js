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
        helpers.debug(opts, false, requiresSignature);

        return new Promise((resolve, reject) => {

            http_request(
                {
                    url: helpers.rootUrl(opts, false, requiresSignature)
                },
                ( err, res, body ) => {
                    body = helpers.parseBody(body);

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

        const helpers = new Helpers(config);
        helpers.debug(opts, true, true);

        return new Promise((resolve, reject) => {

            http_request(
                {
                    method: 'post',
                    url: helpers.rootUrl(opts, true, true),
                    form: helpers.formData(opts)
                },
                ( err, res, body ) => {
                    body = helpers.parseBody(body);

                    let error = helpers.error(err, res, body);
                    if (error){ reject(error); }else{ resolve(body); }
                }
            );

        });

    }

}

module.exports = Request;
