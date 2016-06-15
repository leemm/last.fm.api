'use strict';

const Request = require('../lib/request'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path');

class API extends Request {

	/**
     * API wrapper
     * @param  {Object} opts
     */
    constructor(opts) {
        super();

        this.options = opts || {};
        this.url = 'http://ws.audioscrobbler.com/2.0/?%smethod=%s&api_key=%s&format=%s';
        this.defaults = {
            api_key: this.options.apiKey,
            api_secret: this.options.apiSecret,
            format: 'json'
        };

        let files = _.filter(fs.readdirSync(__dirname), file => { return path.parse(file).ext === '.js' && file !== 'index.js'; });
        files.map(file => {

            let info = path.parse(file);

            this[info.name] = new (require('./' + file))(this, super.get, super.post);

        });
    }

}

module.exports = API;
