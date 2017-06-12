'use strict';

const Request = require('../lib/request'),
    _ = require('lodash'),
    Album = require('./album'),
    Artist = require('./artist'),
    Auth = require('./auth'),
    Chart = require('./chart'),
    Library = require('./library'),
    Tag = require('./tag'),
    Track = require('./track'),
    User = require('./user');

class API extends Request {

	/**
     * API wrapper
     * @param  {Object} opts
     */
    constructor(opts) {
        super();

        this.options = opts || {};
        this.url = 'https://ws.audioscrobbler.com/2.0/?%smethod=%s&api_key=%s&format=%s';
        this.defaults = {
            api_key: this.options.apiKey,
            api_secret: this.options.apiSecret,
            username: this.options.username,
            password: this.options.password,
            format: 'json'
        };

        this.album = new Album(this, super.get, super.post);
        this.artist = new Artist(this, super.get, super.post);
        this.auth = new Auth(this, super.get, super.post);
        this.chart = new Chart(this, super.get, super.post);
        this.library = new Library(this, super.get, super.post);
        this.tag = new Tag(this, super.get, super.post);
        this.track = new Track(this, super.get, super.post);
        this.user = new User(this, super.get, super.post);
    }

}

module.exports = API;
