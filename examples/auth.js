'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(key),
	express = require('express'),
	port = 8085,
	app = express();

app.get('/', (req, res) => {

	// Redirect to last.fm - if user is logged in they will be asked to allow permission to this app.
	// It not logged in they will be forced to do so then asked to allow permission.
	//
	// webAuthUrl is a helper for constructing the full auth url for last.fm
	res.redirect(api.auth.webAuthUrl('http://localhost:' + port + '/authenticated'));

});

app.get('/authenticated', (req, res) => {

	// Last.fm sends the auth token back, it's valid for 60 minutes.
	let token = req.query.token;
	if (token){

		// TO DO : secret!

		let signature = api.auth.signature({ method: 'auth.getSession', token: token });
		console.log(signature);

		// Get a session
		// api.auth.getSession({
		// 	token: token,
		// 	api_sig: signature // required, MD5 hash based on token and api key
		// })
		// 	.then(json => { 
		// 		console.log(json); 
		// 		process.exit();
		// 	})
		// 	.catch(err => { 
		// 		console.error('ERRORED!', JSON.stringify(err)); 
		// 		process.exit();
		// 	});

	}

});

console.log('express running on port ' + port);
app.listen(port);

// api.auth.getToken({ username: 'kurt', password: 'cobain' })
// 	.then(json => { console.log(json); })
// 	.catch(err => { console.error(err); });
