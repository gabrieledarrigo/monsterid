import sinon from 'sinon';
import gd from 'node-gd';
import assert from 'assert';
import monsterId from '../src/monsterId';

let copyFn;
let fillFn;
let colorAllocateFn;
let createTrueColorFn;
let createFromPngFn;

const imageMock = {
  fill: () => {},
  colorAllocate: () => {},
  copy: () => {},
  pngPtr: () => {},
};

describe('monsterId', () => {
  beforeEach(() => {
    copyFn = sinon.spy(imageMock, 'copy');
    fillFn = sinon.spy(imageMock, 'fill');
    colorAllocateFn = sinon.spy(imageMock, 'colorAllocate');
    createTrueColorFn = sinon.stub(gd, 'createTrueColor').callsFake(() => Promise.resolve(imageMock));
    createFromPngFn = sinon.stub(gd, 'createFromPng').callsFake(() => Promise.resolve(imageMock));
  });

  afterEach(() => {
    sinon.restore();
  });

  test('it should create an image object ready to be filled with the various monster\' parts', async () => {
    const username = 'username';
    await monsterId(username);

    assert.equal(createTrueColorFn.calledOnce, true, 'Create a true color image');
    assert.equal(colorAllocateFn.firstCall.calledWith(255, 255, 255), 1, 'Create the white background');
    assert.equal(colorAllocateFn.secondCall.calledWith(sinon.match.number, sinon.match.number, sinon.match.number), 1, 'Fill with random color');
    assert.equal(fillFn.calledTwice, true, 'Fill the avatar\'s background and the monster part');

    assert.equal(createFromPngFn.callCount, 6, 'Create the image from the monster\'s parts');
    assert.equal(copyFn.calledWith(imageMock, 0, 0, 0, 0, 120, 120), true, 'Copy the new image with the choosen monster\'s part');
    assert.equal(colorAllocateFn.secondCall.calledWith(sinon.match.number, sinon.match.number, sinon.match.number), true, 'Fill with random color');
  });
});
