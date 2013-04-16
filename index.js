/*
* MonsterId for NodeJs, version 0.0.1
* Author Gabriele D'Arrigo - @acirdesign
* Original php library by Andreas Gohr - http://www.splitbrain.org/
*/


// Module dependecy.
var gd = require('node-gd');
var srand = require('srand');
var crypto = require('crypto');

var monsterId = function (string) {
    var md5 = crypto.createHash('md5').update(string).digest('hex');
    var seed = parseInt(md5.substr(0, 6), 16);
    var size = 120;

    this.getAvatar = function() {
        // Create seed.
        srand.seed(seed);

        // Avatar random parts.
        var parts = {
            legs : Math.floor(srand.random() * 5) + 1,
            hair : Math.floor(srand.random() * 5) + 1,
            arms : Math.floor(srand.random() * 5) + 1,
            body : Math.floor(srand.random() * 15) + 1,
            eyes : Math.floor(srand.random() * 15) + 1,
            mouth: Math.floor(srand.random() * 10) + 1
        };  
        // Create avatar.
        var avatar = gd.createTrueColor(size, size);

        avatar.fill(0, 0, avatar.colorAllocate(255, 255, 255));

        // Fill avatar with random parts.
        for (var i in parts) {
            var path = __dirname + '/images/parts/' + i + '_' + parts[i] + '.png';

            var image = gd.createFromPng(path);

            image.copy(avatar, 0, 0, 0, 0, size, size);

            if (i === 'body') {
                var randomNumber = Math.floor(srand.random() * 200) + 55;
            
                var randomColor = avatar.colorAllocate(randomNumber,randomNumber,randomNumber);
            
                avatar.fill(0, 0, randomColor);
            };
        } 
        // Return a stream
        return avatar.pngPtr();
    };
};

module.exports = monsterId;