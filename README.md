## Node Js monsterId

NodeJs implementation of [monsterId](http://www.splitbrain.org/projects/monsterid) PHP library.
It depends by node-gd, crypto and srand npm packages.

## How to use
//Include monsterId and create an http Server.
var monsterId = require('monsterid');
var http = require('http');

http.createServer(function(req, res) {
    // Create your seed. 
    var seed = 'abcdefg';
    
    var avatar = new monsterId(seed);

    // use public method getAvatar to retrieve an image in binary format.
    res.writeHead(200, {'Content-type':'image/png'});
    res.end(avatar.getAvatar(), 'binary');
}).listen('8088');

## Credits

Thanks to [Andreas Gohr](http://www.splitbrain.org/personal) for his job on the original library.
