/*
 * MonsterId for NodeJs, version 0.1.0
 * Author Gabriele D'Arrigo - @acirdesign
 * Original php library by Andreas Gohr - http://www.splitbrain.org/
*/
import gd from 'node-gd';
import seed from 'seed-random';
import crypto from 'crypto';
import randomNumber from './utils/random-number.js';

const size = 120;

export default {
	async fillParts(avatar, size = 120, getRandomNumber, gd) {
		const parts = {
			legs: getRandomNumber(5, 1),
			hair: getRandomNumber(5, 1),
			arms: getRandomNumber(5, 1),
			body: getRandomNumber(15, 1),
			eyes: getRandomNumber(15, 1),
			mouth: getRandomNumber(10, 1)
		};

		for (let part in parts) {
			let path = __dirname + '/../images/parts/' + part + '_' + parts[part] + '.png';
			let image = await gd.createFromPng(path);

			image.copy(avatar, 0, 0, 0, 0, size, size);

			if (part === 'body') {
				avatar.fill(0, 0, avatar.colorAllocate(
					getRandomNumber(200, 55),
					getRandomNumber(200, 55),
					getRandomNumber(200, 55)
				));
			};
		}

		// Return the avatar.
		return avatar.pngPtr();
	},
	async getAvatar(username = '') {
		const hash = crypto.createHash('md5').update(username).digest('hex');
		const rseed = parseInt(hash.substr(0, 6), 16);
		const getRandomNumber = randomNumber(seed(rseed)());

		// Create the image with gd.
		let image = await gd.createTrueColorSync(size, size);
		let color = image.colorAllocate(255, 255, 255);
		image.fill(0, 0, color);

		return this.fillParts(image, size, getRandomNumber, gd);
	}
}
