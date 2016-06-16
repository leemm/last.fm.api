'use strict';

const key = require('./apikey.json'),
	API = require('../api'),
	api = new API(Object.assign(key, { debug: true }));

api.tag.getInfo({
	tag: 'punk rock',
	lang: 'eng' // optional
})
	.then(json => { console.log(json); })
	.catch(err => { console.error(err); });
