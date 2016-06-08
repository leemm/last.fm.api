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
     * @return {Promise}
     */
    get(config, opts) {

        const helpers = new Helpers(config);
        helpers.debug(opts);

        return new Promise((resolve, reject) => {

            http_request(
                {
                    url: helpers.rootUrl(opts)
                },
                ( err, res, body ) => {
                    body = body && body.indexOf('{') > -1 ? JSON.parse(body) : {};

                    let error = helpers.error(err, res, body);
                    if (error){ reject(error); }else{ resolve(body); }
                }
            );

        });

    }

    post(opts) {

    }

}

module.exports = Request;