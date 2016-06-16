'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(Object.assign(key, { debug: true }));

// Get API token
api.auth.getToken({})
	.then(json => json.token)
	.then(token => {

		// Check if user is logged in already
		return api.auth.getAuthorization(token);

	})
	.then(auth => {
		
		// If auth.requiresLogin your desktop app should open a browser window and redirect THEN request the session id
		// Session Lifetime is infinite by default
		
		return auth.token;
	})
	.then(token => {

		// Get a session so we can make modifications
		return api.auth.getSession({
			token: token
		})

	})
	.then(json => session.session)
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

