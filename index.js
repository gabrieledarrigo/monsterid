const http = require('http');
const monsterId = require('./dist/index');

console.log(monsterId);


http.createServer((req, res) => {
	const username = 'username';
	const avatar = monsterId.getAvatar(username);


  res.writeHead(200, {'Content-type':'image/png'});
  res.end(avatar, 'binary');
}).listen('8088');