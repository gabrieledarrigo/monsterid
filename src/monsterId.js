import gd from 'node-gd';
import { fromString } from './utils/randomNumber';

const defaultOptions = {
  size: 120,
};

export default async function monsterId(username = '', options = defaultOptions) {
  const { size } = options;
  const getRandomNumber = fromString(username);
  const monster = await gd.createTrueColor(size, size);
  const color = monster.colorAllocate(255, 255, 255);

  monster.fill(0, 0, color);

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
    image.copyResized(monster, 0, 0, 0, 0, size, size, 120, 120);

    if (part === 'body') {
      monster.fill(0, 0, monster.colorAllocate(
        getRandomNumber(55, 200),
        getRandomNumber(55, 200),
        getRandomNumber(55, 200),
      ));
    }
  }

  return monster.pngPtr();
}
