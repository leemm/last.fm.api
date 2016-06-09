'use strict';

const express = require('express'),
	app = express(),
	port = 8085,
	key = { apiKey: '2dff7465336a2724e04fe62619e752d4' },
	API = require('../api'),
	api = new API(key);

app.get('/', (req, res) => {

	// Redirect to last.fm - if user is logged in they will be asked to allow permission to this app.
	// It not logged in they will be forced to do so then asked to allow permission.
	res.redirect('http://www.last.fm/api/auth/?api_key=' + key.apiKey + '&cb=http://localhost:' + port + '/authenticated');

});

app.get('/authenticated', (req, res) => {

	// Last.fm sends the auth token back, it valid for 60 minutes.
	res.send(req.query);

});

console.log('express running on port ' + port);
app.listen(port);

// api.auth.getToken({ username: 'kurt', password: 'cobain' })
// 	.then(json => { console.log(json); })
// 	.catch(err => { console.error(err); });
