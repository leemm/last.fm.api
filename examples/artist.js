'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(key);

api.artist.getInfo({
	artist: 'Nirvana',
	username: 'cheweduppunk', // optional
	lang: 'eng', // optional
	//autocorrect: 1 // autocorrect is optional
	//mbid: 'nevermind' Musicbrainz ID (optional)
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });

api.artist.getSimilar({ artist: 'nirvana' })
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });
