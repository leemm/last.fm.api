'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(key);

api.artist.getSimilar({ artist: 'nirvana' })
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });
