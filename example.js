const http = require('http');
const monsterId = require('monsterId');

http.createServer(async (req, res) => {
  const username = 'username';
  const avatar = await monsterId(username);

  res.writeHead(200, { 'Content-type': 'image/png' });
  res.end(avatar, 'binary');
}).listen('8080');
