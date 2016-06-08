'use strict';

require('string-format-js');
const _ = require('lodash');

const filter = {
	artist: 'cher',
	album: 'believe'
};

let flat = Object.keys(filter).map( key => {
	return '%s=%s'.format(key, filter[key]);
});

console.log( flat );

