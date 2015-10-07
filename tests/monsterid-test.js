import test   from 'tape';
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

function before() {
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
}

function after() {
	sandbox.restore();
}

test('it should create an image object ready to be filled with the various monster\' parts', t => {
	t.plan(7);
	before();
	
	let username  = 'username';
	let hashMock  = { update : () => {}, digest: () => {} };
	let createHashFn = sandbox.stub(crypto, 'createHash', () => {
		return hashMock;
	});

	let updateFn = sandbox.stub(hashMock, 'update', () => { return hashMock; });
	let digestFn = sandbox.stub(hashMock, 'digest', () => { return '6761627269656c65207761732068657265'; });

	let imageMock = { fill: () => {}, colorAllocate : () => {} };
	let createTrueColorFn = sandbox.stub(gd, 'createTrueColor', () => {
		return imageMock;
	});

	let colorAllocateFn = sandbox.spy(imageMock, 'colorAllocate');
	let fillFn = sandbox.spy(imageMock, 'fill');
	let fillPartsFn = sandbox.stub(monsterId, 'fillParts');

	// Create the avatar
	let avatar = monsterId.getAvatar(username);

	t.equal(createHashFn.calledWith('md5'), true, 'Create an md5 hash');
	t.equal(updateFn.calledWith(username), true, 'Update the hash object');
	t.equal(digestFn.calledWith('hex'), true, 'Create the hexadecimal hash');

    t.equal(createTrueColorFn.callCount, 1, 'Create a true color image');
    t.equal(colorAllocateFn.callCount, 1, 'Create the white background');
    t.equal(fillFn.callCount, 1, 'Fill the avatar\'s background ');
    t.equal(fillPartsFn.callCount, 1, 'Fill the avatar with monster\'s body parts');

    after();
    t.end();
});

test('it should fill the avatar with the various monster\' parts', t => {
	t.plan(5);
	before();

	let username = 'username';
	let size = 120;
	let createFromPngFn = sandbox.stub(gd, 'createFromPng', () => {
		return imageMock;
	});

	let getRandomNumberFn = sandbox.spy(() => {});
	let avatar = monsterId.fillParts(imageMock, size, getRandomNumberFn, gd);

	t.equal(getRandomNumberFn.callCount, 9, 'Call getRandomNumber to retrieve a random number from a seed');
	t.equal(createFromPngFn.callCount, 6, 'Create the image from the monster\'s parts');
	t.equal(copyFn.calledWith(imageMock, 0, 0, 0, 0, size, size), true, 'Copy the new image with the choosen monster\'s part');

	t.equal(colorAllocateFn.callCount, 1, 'Create a random color for the choosen part');
	t.equal(fillFn.callCount, 1, 'Fill the avatar with the random color');

	after();
	t.end();
});
