## Node.js monsterId
> Create your unique monstrous avatar


[![Build Status](https://travis-ci.org/gabrieledarrigo/monsterid.svg?branch=master)](https://travis-ci.org/gabrieledarrigo/monsterid)

Node.js implementation of [monsterId](http://www.splitbrain.org/projects/monsterid) PHP library.
Create a unique avatar based on a seed number.

## Installation
This library depend on [node-gd](https://github.com/y-a-v-a/node-gd) so You must have [libgd](http://libgd.github.io/) installed in your system.

    $ npm install monsterid

## How to use

```js
//Include monsterId and create an http Server.
var http      = require('http');
var monsterId = require('./dist/index.js');

http.createServer(function(req, res) {
	// Your username.
	var username  = 'username';

	// Use method getAvatar to retrieve an image in binary format.
	var avatar    = monsterId.getAvatar(username);

    res.writeHead(200, {'Content-type':'image/png'});
    res.end(avatar, 'binary');
}).listen('8088');
```

## Transpile and test

The library is authored in ES2015 and transpiled with [Babel](https://babeljs.io/).  
To transpile the src files run this command:

	$ npm run build

To launch unit tests (with [Tape](https://github.com/substack/tape)) run this command:

	$ npm run test


## Credits

Thanks to [Andreas Gohr](http://www.splitbrain.org/personal) for his job on the original library.
