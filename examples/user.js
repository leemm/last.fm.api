'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(Object.assign(key, { debug: true }));

api.user.getArtistTracks({
	user: 'cheweduppunk',
	artist: 'nirvana',
	page: 1, // optional
	//startTimestamp: 1420070400, // optional,
	//endTimestamp: 1451606400, // optional
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });
