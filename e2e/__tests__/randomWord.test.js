const randomWord = require('../../lib/middleware/randomWord');
const { signupAdmin } = require('../../lib/middleware/signup-admin');
const request = require('../request');
const { dropCollection } = require('../db');

describe('randomWord', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('queries'));

  let adminUser = null;
  beforeEach(() => {
    return signupAdmin().then(user => (adminUser = user));
  });

  it('returns a random synonym', () => {

    let word = 'hot';
    return randomWord(word)
      .then(res => {
        expect(res).toEqual(expect.any(String));
      });
  });

});