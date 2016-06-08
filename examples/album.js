'use strict';

const API = require('../api'),
	api = new API({ apiKey: '2dff7465336a2724e04fe62619e752d4', debug: true });

api.album.search({
	album: 'nevermind',
	page: 1, // optional
	limit: 30, // optional
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });

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