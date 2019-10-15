const randomAnt = require('../../lib/middleware/randomAnt');
const { dropCollection } = require('../db');
const { splitString, arrayMap, joinString } = require('../../lib/middleware/randomWord');

describe('randomAnt', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('queries'));

  it('returns a random antonym', () => {
    let word = 'cold';
    return randomAnt(word)
      .then(res => {
        expect(res).toEqual(expect.any(String));
      });
  });

  it('transforms a string', () => {
    const input = 'the quick brown fox jumped over the lazy dog';
    const arr = splitString(input);
    return arrayMap(arr, randomAnt)
      .then(res => {
        joinString(res);
      },
      expect.any(String));
  });
});