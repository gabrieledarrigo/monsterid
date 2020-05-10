# Node.js monsterId
![image](https://user-images.githubusercontent.com/1985555/81498938-0a2c2080-92c8-11ea-96cd-a6f532eca7fe.png)

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/gabrieledarrigo/monsterid/Node.js%20CI) ![npm](https://img.shields.io/npm/v/monsterid)

monsterId is the Node.js implementation of [monsterId](http://www.splitbrain.org/projects/monsterid) PHP library.
It creates a unique avatar starting from a string, typically a username, used to generate a unique seed number.

## Installation

This library depends on [node-gd](https://github.com/y-a-v-a/node-gd) so, in order to use monsterId, you need to have [libgd](https://github.com/libgd) installed on your system.
You can follow node-gd installastion's instructions [here](https://github.com/y-a-v-a/node-gd#installation).  

To install monsterId just type the following command:

```
$ npm install monsterid
```

## How to use

The usage is actually simple; 
Import the library an call `monsterId` function with a username to have back a binary object which represents your unique avatar 👾.

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

monsterId is authored in ES6, transpiled with [Babel](https://babeljs.io/), and exported as a CommonJS module.
To transpile the src files run this command:

```
$ npm run build
```

To launch unit tests suite (with [Jest](https://jestjs.io/)) run this command:

```
$ npm run test
```

## Credits

Thanks to [Andreas Gohr](http://www.splitbrain.org/personal) for his job on the original library.
