'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(Object.assign(key, { debug: true }));

api.chart.getTopTracks({
	page: 1, // optional, defaults to 1
	limit: 50 // optional, defaults to 50
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });
