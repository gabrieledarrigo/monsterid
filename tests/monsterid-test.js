import test   from 'ava';
import register from 'babel-register';
import buffer from 'buffer';
import seed   from 'seed-random';
import crypto from 'crypto';
import sinon  from 'sinon';
import gd     from 'node-gd';
import monsterId from '../src/index.js';

let sandbox,
	imageMock,
	copyFn,
	fillFn,
	pngPtr,
	colorAllocateFn;

test.beforeEach(t => {
	sandbox = sinon.sandbox.create();
	imageMock = {
		fill: () => {},
		colorAllocate : () => {},
		copy: () => {},
		pngPtr: () => {}
	};

	copyFn = sandbox.spy(imageMock, 'copy');
	fillFn = sandbox.spy(imageMock, 'fill');
	pngPtr = sandbox.spy(imageMock, 'pngPtr');
	colorAllocateFn = sandbox.spy(imageMock, 'colorAllocate');
});

test.afterEach(t => {
	sandbox.restore();
});

test('it should create an image object ready to be filled with the various monster\' parts', t => {
	t.plan(7);
	
	let username  = 'username';
	let hashMock  = { update : () => {}, digest: () => {} };
	let createHashFn = sandbox.stub(crypto, 'createHash', () => {
		return hashMock;
	});

	let updateFn = sandbox.stub(hashMock, 'update', () => { return hashMock; });
	let digestFn = sandbox.stub(hashMock, 'digest', () => { return '6761627269656c65207761732068657265'; });

	let imageMock = { fill: () => {}, colorAllocate : () => {} };
	let createTrueColorFn = sandbox.stub(gd, 'createTrueColorSync', () => {
		return imageMock;
	});

	let colorAllocateFn = sandbox.spy(imageMock, 'colorAllocate');
	let fillFn = sandbox.spy(imageMock, 'fill');
	let fillPartsFn = sandbox.stub(monsterId, 'fillParts');

	// Create the avatar
	let avatar = monsterId.getAvatar(username);

	t.is(createHashFn.calledWith('md5'), true, 'Create an md5 hash');
	t.is(updateFn.calledWith(username), true, 'Update the hash object');
	t.is(digestFn.calledWith('hex'), true, 'Create the hexadecimal hash');

    t.is(createTrueColorFn.callCount, 1, 'Create a true color image');
    t.is(colorAllocateFn.callCount, 1, 'Create the white background');
    t.is(fillFn.callCount, 1, 'Fill the avatar\'s background ');
    t.is(fillPartsFn.callCount, 1, 'Fill the avatar with monster\'s body parts');
});

test('it should fill the avatar with the various monster\' parts', t => {
	t.plan(5);

	let username = 'username';
	let size = 120;
	let createFromPngFn = sandbox.stub(gd, 'createFromPng', () => {
		return imageMock;
	});

	let getRandomNumberFn = sandbox.spy(() => {});
	let avatar = monsterId.fillParts(imageMock, size, getRandomNumberFn, gd);

	t.is(getRandomNumberFn.callCount, 9, 'Call getRandomNumber to retrieve a random number from a seed');
	t.is(createFromPngFn.callCount, 6, 'Create the image from the monster\'s parts');
	t.is(copyFn.calledWith(imageMock, 0, 0, 0, 0, size, size), true, 'Copy the new image with the choosen monster\'s part');

	t.is(colorAllocateFn.callCount, 1, 'Create a random color for the choosen part');
	t.is(fillFn.callCount, 1, 'Fill the avatar with the random color');
});
