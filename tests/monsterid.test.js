import crypto from 'crypto';
import sinon from 'sinon';
import gd from 'node-gd';
import assert from 'assert';
import monsterId from '../src/index';

let imageMock;
let copyFn;
let fillFn;
let colorAllocateFn;

beforeEach(() => {
  imageMock = {
    fill: () => {},
    colorAllocate: () => {},
    copy: () => {},
    pngPtr: () => {},
  };

  copyFn = sinon.spy(imageMock, 'copy');
  fillFn = sinon.spy(imageMock, 'fill');
  colorAllocateFn = sinon.spy(imageMock, 'colorAllocate');
});

afterEach(() => {
  sinon.restore();
});

test('it should create an image object ready to be filled with the various monster\' parts', async () => {
  const username = 'username';
  const hashMock = {
    update: () => {},
    digest: () => {},
  };

  const createHashFn = sinon.stub(crypto, 'createHash').callsFake(() => hashMock);
  const updateFn = sinon.stub(hashMock, 'update').callsFake(() => hashMock);
  const digestFn = sinon.stub(hashMock, 'digest').callsFake(() => '6761627269656c65207761732068657265');
  const createTrueColorFn = sinon.stub(gd, 'createTrueColorSync').callsFake(() => imageMock);
  const fillPartsFn = sinon.stub(monsterId, 'fillParts');

  // Create the avatar
  await monsterId.getAvatar(username);

  assert.equal(createHashFn.calledWith('md5'), true, 'Create an md5 hash');
  assert.equal(updateFn.calledWith(username), true, 'Update the hash object');
  assert.equal(digestFn.calledWith('hex'), true, 'Create the hexadecimal hash');

  assert.equal(createTrueColorFn.callCount, 1, 'Create a true color image');
  assert.equal(colorAllocateFn.callCount, 1, 'Create the white background');
  assert.equal(fillFn.callCount, 1, 'Fill the avatar\'s background ');
  assert.equal(fillPartsFn.callCount, 1, 'Fill the avatar with monster\'s body parts');
});

test('it should fill the avatar with the various monster\' parts', async () => {
  const size = 120;
  const createFromPngFn = sinon.stub(gd, 'createFromPng').callsFake(() => imageMock);
  const getRandomNumberFn = sinon.spy(() => {});

  await monsterId.fillParts(imageMock, size, getRandomNumberFn, gd);

  assert.equal(getRandomNumberFn.callCount, 9, 'Call getRandomNumber to retrieve a random number from a seed');
  assert.equal(createFromPngFn.callCount, 6, 'Create the image from the monster\'s parts');
  assert.equal(copyFn.calledWith(imageMock, 0, 0, 0, 0, size, size), true, 'Copy the new image with the choosen monster\'s part');

  assert.equal(colorAllocateFn.callCount, 1, 'Create a random color for the choosen part');
  assert.equal(fillFn.callCount, 1, 'Fill the avatar with the random color');
});
