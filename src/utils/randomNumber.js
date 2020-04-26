import random from 'seed-random';
import crypto from 'crypto';

export function randomNumber(seed) {
  return random(seed)();
}

export function fromString(string) {
  const hash = crypto.createHash('md5').update(string).digest('hex');
  const rseed = parseInt(hash.substr(0, 6), 16);

  return function rand(from = 1, to = 1) {
    return Math.floor(randomNumber(rseed) * (to - from + 1) + from);
  };
}
