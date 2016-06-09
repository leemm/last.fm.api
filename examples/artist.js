'use strict';

const API = require('../api'),
	api = new API({ apiKey: '2dff7465336a2724e04fe62619e752d4' });

api.artist.getSimilar({ artist: 'nirvana' })
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });