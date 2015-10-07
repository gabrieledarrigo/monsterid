## Node.js monsterId
> Create your unique monstrous avatar

Node.js implementation of [monsterId](http://www.splitbrain.org/projects/monsterid) PHP library.
Create a unique avatar based on a seed number.

## Installation

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

To run all unit tests (they run on [Tape](https://github.com/substack/tape) run this command:

	$ npm run test


## Credits

Thanks to [Andreas Gohr](http://www.splitbrain.org/personal) for his job on the original library.
