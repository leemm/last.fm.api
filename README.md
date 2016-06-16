last.fm.api
===========

[![Build Status](https://travis-ci.org/leemm/last.fm.api.svg?branch=master)](https://travis-ci.org/leemm/last.fm.api)

Wrapper for Last.FM API v2 with ES6 style classes and promises.  Supports Desktop, Web and Mobile auth.  http://www.last.fm/api

# Prerequisites

You need an API key and secret:
* http://www.last.fm/api/account/create
* Note your API Key and Secret.  (If using the examples in this module add them to examples/apikey.json)

# Install
```
npm install last.fm.api --save
```

# Usage

All API methods listed in the developer documentation http://www.last.fm/api are mapped to the API class. e.g. **api.album.getTags()** for the API method *album.getTags*.
** You do not need to supply *api_sig* and *api_key* to the methods, these will be generated automatically.  You must supply *sk* (session key) for methods that require it. ** 

```javascript
'use strict';

const API = require('last.fm.api'),
    api = new API({ 
        apiKey: '<YOUR API KEY>', 
        apiSecret: '<YOUR API SECRET>'
    });
```

# API

new API(options);
* **apiKey** *String* - Your API key
* **apiSecret** *String* - Your API secret
* **debug** *Boolean* - If true the URL, Querystring and Form body is written to the console. (default ```false```)
* **username** *String* - Your Last.FM username, required when using authentication for Mobile apps (optional)
* **password** *String* - Your Last.FM password, required when using authentication for Mobile apps (optional)

# Examples

There are a lot of examples in the /examples folder which I've tried to comment thoroughly.  Likewise there are examples of Desktop, Mobile and Web Authorisation.

```javascript
'use strict';

const API = require('last.fm.api'),
    api = new API({ 
        apiKey: '<YOUR API KEY>', 
        apiSecret: '<YOUR API SECRET>'
    });

api.album.getTags({
    artist: 'nirvana',
    album: 'nevermind'
})
    .then(tags => { console.log(tags); })
    .catch(err => { console.error(err); });

/*
// tags = ...
{
    "tags": {
        "tag": [{
            "name": "metal",
            "url": "http://www.last.fm/tag/metal"
        }, {
            "name": "punk",
            "url": "http://www.last.fm/tag/punk"
        }, {
            "name": "Grunge",
            "url": "http://www.last.fm/tag/Grunge"
        }, {
            "name": "noise",
            "url": "http://www.last.fm/tag/noise"
        }],
        "@attr": {
            "artist": "Nirvana",
            "album": "Nevermind"
        }
    }
} */
```

To get a session key for mobile apps

```javascript
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
        console.log('session', session);
        process.exit();
    })
    .catch(err => {
        console.error('ERRORED!', JSON.stringify(err));
        process.exit();
    });

/*
// result = ...
{
    "subscriber": 0,
    "name": "<YOUR USERNAME>",
    "key": "<SESSION KEY>"
} */
```
