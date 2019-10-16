const shortWord = require('../../lib/middleware/short-word');
const { dropCollection } = require('../db');

describe('shortWord', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('queries'));

  it('returns a (short) synonym', () => {
    let word = 'victuals';
    return shortWord(word)
      .then(res => {
        expect(res).toEqual('edible');
      });
  });
});