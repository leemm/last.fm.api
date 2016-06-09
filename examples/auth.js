'use strict';

const key = { apiKey: '2dff7465336a2724e04fe62619e752d4' },
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
	res.send(req.query);
	process.exit();

});

console.log('express running on port ' + port);
app.listen(port);

// api.auth.getToken({ username: 'kurt', password: 'cobain' })
// 	.then(json => { console.log(json); })
// 	.catch(err => { console.error(err); });
