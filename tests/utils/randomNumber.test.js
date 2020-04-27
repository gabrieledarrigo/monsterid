import { randomNumber, fromString } from '../../src/utils/randomNumber';

describe('randomNumber', () => {
  it('should return the same number given a seed', () => {
    expect(randomNumber(1)).toEqual(0.1776348083296759);
    expect(randomNumber(1)).toEqual(0.1776348083296759);
  });
});

describe('randomNumberFromString', () => {
  it('should return a function that given a string that is used as a seed, generate the same number between a min and a max value', () => {
    expect(fromString('foo')(55, 200)).toEqual(58);
    expect(fromString('foo')(55, 200)).toEqual(58);
    expect(fromString('bar')(10, 20)).toEqual(18);
    expect(fromString('bar')(10, 20)).toEqual(18);
  });
});
