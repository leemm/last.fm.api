'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(Object.assign(key, { debug: true }));

// http://www.last.fm/api/show/track.scrobble
// track scrobbling can be done in batches of up to 50, so passing an array instead of a single object into 'tracks' will allow this to happen.  
// See the above link for descriptions of the optional params which must be passed into the track object

api.track.scrobble({
	tracks: [
		{
			artist: 'Nirvana',
			track: 'Blew',
			timestamp: 1466084985 // The time the track starting playing, UNIX timestamp
			//album: 'bleach', // optional,
			//trackNumber: 7, // optional,
			//mbid: '' // optional
		},
		{
			artist: 'Nirvana',
			track: 'Floyd the Barber',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'About a Girl',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'School',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Love Buzz',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Paper Cuts',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Negative Creep',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Scoff',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Swap Meet',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Mr. Moustache',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Sifting',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Big Cheese',
			timestamp: 1466084995
		},
		{
			artist: 'Nirvana',
			track: 'Downer',
			timestamp: 1466084995
		}
	],
	sk: '<YOUR SESSION KEY>'// session key is required
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });
