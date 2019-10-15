const { randomAnt } = require('../../lib/middleware/randomAnt');
const { dropCollection } = require('../db');

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
});