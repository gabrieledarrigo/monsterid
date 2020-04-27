import gd from 'node-gd';
import { fromString } from './utils/randomNumber';

const DEFAULT_SIZE = 120;

async function fillParts(avatar, getRandomNumber) {
  const parts = {
    legs: getRandomNumber(1, 5),
    hair: getRandomNumber(1, 5),
    arms: getRandomNumber(1, 5),
    body: getRandomNumber(1, 15),
    eyes: getRandomNumber(1, 15),
    mouth: getRandomNumber(1, 10),
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const [part] of Object.entries(parts)) {
    const path = `${__dirname}/../images/parts/${part}_${parts[part]}.png`;
    // eslint-disable-next-line no-await-in-loop
    const image = await gd.createFromPng(path);
    image.copy(avatar, 0, 0, 0, 0, DEFAULT_SIZE, DEFAULT_SIZE);

    if (part === 'body') {
      avatar.fill(0, 0, avatar.colorAllocate(
        getRandomNumber(55, 200),
        getRandomNumber(55, 200),
        getRandomNumber(55, 200),
      ));
    }
  }

  return avatar.pngPtr();
}

export default async function monsterid(username = '') {
  const getRandomNumber = fromString(username);
  const image = await gd.createTrueColor(DEFAULT_SIZE, DEFAULT_SIZE);
  const color = image.colorAllocate(255, 255, 255);

  image.fill(0, 0, color);

  return fillParts(image, getRandomNumber);
}
