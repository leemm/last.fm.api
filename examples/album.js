'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(Object.assign(key, { debug: true }));

api.album.getInfo({
	artist: 'nirvana',
	album: 'nevermind',
	username: 'cheweduppunk', // optional
	lang: 'eng', // optional
	//autocorrect: 1 // autocorrect is optional
	//mbid: 'nevermind' Musicbrainz ID (optional)
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });


api.album.getTags({
	artist: 'nirvana',
	album: 'nevermind',
	username: 'cheweduppunk',
	//autocorrect: 1 // autocorrect is optional
	//mbid: 'nevermind' Musicbrainz ID (optional)
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });

api.album.getTopTags({
	artist: 'nirvana',
	album: 'nevermind',
	//autocorrect: 1 // autocorrect is optional
	//mbid: 'nevermind' Musicbrainz ID (optional)
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });

api.album.search({
	album: 'nevermind',
	page: 1, // optional
	limit: 30, // optional
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });
