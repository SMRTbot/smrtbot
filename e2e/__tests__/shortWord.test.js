const { splitString, joinString, arrayMap } = require('../../lib/middleware/randomWord');
const { shortWord } = require('../../lib/middleware/shortWord');
const { dropCollection } = require('../db');

describe('shortWord', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('queries'));

  it('returns a (short) synonym', () => {
    let word = 'victuals';
    return shortWord(word)
      .then(res => {
        console.log(res);
        expect(res).toEqual('edible');
      });
  });



});