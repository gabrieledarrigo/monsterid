# Node.js monsterId
> 👾 Create your unique monstrous avatar


![Node.js CI](https://github.com/gabrieledarrigo/monsterid/workflows/Node.js%20CI/badge.svg)

Node.js implementation of [monsterId](http://www.splitbrain.org/projects/monsterid) PHP library.
It creates a unique avatar starting from a string, typically a username, used to generate a unique seed number.

## Installation

This library depends on [node-gd](https://github.com/y-a-v-a/node-gd) so, in order to use monsterId, you need to have [libgd](https://github.com/libgd) installed on your system.
You can follow node-gd installastion's instructions here: [node-gd](https://github.com/y-a-v-a/node-gd#installation).  

To install monsterId just 

```
  $ npm install monsterid
```

## How to use

The usage is actually simple; just import the library an call `monsterId` function with a username to have back a binary object which represents
your unique avatar 👾.

```js
const http = require('http');
const monsterId = require('monsterId');

http.createServer(async (req, res) => {
  const username = 'username';
  const avatar = await monsterId(username);

  res.writeHead(200, { 'Content-type': 'image/png' });
  res.end(avatar, 'binary');
}).listen('8080');
```

`monsterId` function accepts an optional configuration object that can be used to specify the desired size of the avatar:

```js
const monsterId = require('monsterId');

const avatar = monsterId('username', {
	size: 200,
});
```

## Contributing

The library is authored in ES6, transpiled with [Babel](https://babeljs.io/), and exported as CommonJS module.
To transpile the src files run this command:

```
	$ npm run build
```

To launch all unit tests (with [Jest](https://jestjs.io/)) run this command:

```
	$ npm run test
```

## Credits

Thanks to [Andreas Gohr](http://www.splitbrain.org/personal) for his job on the original library.
