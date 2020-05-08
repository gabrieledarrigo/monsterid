import gd from 'node-gd';
import monsterId from '../src/monsterId';

const imageMock = {
  colorAllocate: jest.fn(),
  copyResized: jest.fn(),
  fill: jest.fn(),
  pngPtr: jest.fn(),
};

describe('monsterId', () => {
  beforeEach(() => {
    jest.spyOn(gd, 'createTrueColor').mockResolvedValue(imageMock);
    jest.spyOn(gd, 'createFromPng').mockResolvedValue(imageMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an image object that is filled with the various monster\' parts', async () => {
    const username = 'username';
    await monsterId(username);

    expect(gd.createTrueColor, 'Create a true color image for the monster')
      .toHaveBeenCalled();

    expect(imageMock.colorAllocate, 'Create the white background')
      .toHaveBeenNthCalledWith(1, 255, 255, 255);

    expect(imageMock.colorAllocate, 'Allocate a random color for monster parts')
      .toHaveBeenNthCalledWith(2, expect.any(Number), expect.any(Number), expect.any(Number));

    expect(gd.createFromPng, 'Create the image from the monster\'s parts')
      .toHaveBeenCalledTimes(6);

    expect(imageMock.copyResized, 'Copy the new image with the choosen monster\'s part')
      .toHaveBeenCalledWith(imageMock, 0, 0, 0, 0, 120, 120, 120, 120);

    expect(imageMock.fill, 'Fill the avatar\'s background and the monster parts')
      .toHaveBeenCalledTimes(2);
  });

  it('should accept an optional configuration object with a size property', async () => {
    const username = 'username';
    const size = 200;

    await monsterId(username, { size });

    expect(gd.createTrueColor, 'Create a true color image for the monster with the specified options size')
      .toHaveBeenCalledWith(size, size);

    expect(imageMock.copyResized, 'Copy the new image with the choosen monster\'s part with the specified options size')
      .toHaveBeenCalledWith(imageMock, 0, 0, 0, 0, size, size, 120, 120);
  });
});
