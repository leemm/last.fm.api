'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(Object.assign(key, { 
		debug: true,
		username: '<YOUR USERNAME>',
		password: '<YOUR PASSWORD>'
	}));

// Get Mobile Session by supplying username and password into API constructor
api.auth.getMobileSession({})
	.then(json => json.session)
	.then(session => {

		// Now that we have a session try to add some tags (a method that requires auth)
		return api.album.addTags({
			artist: 'Nirvana',
			album: 'Nevermind',
			tags: [
				'noise',
				'grunge',
				'punk',
				'metal'
			],
			sk: session.key
		});

	})
	.then(result => {
		console.log('result', result);
		process.exit();
	})
	.catch(err => {
		console.error('ERRORED!', JSON.stringify(err));
		process.exit();
	});

