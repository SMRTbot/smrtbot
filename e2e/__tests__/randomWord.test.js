const { randomWord, splitString, joinString } = require('../../lib/middleware/randomWord');
// const { signupAdmin } = require('../../lib/middleware/signup-admin');
// const request = require('../request');
const { dropCollection } = require('../db');

describe('randomWord', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('queries'));

  // let adminUser = null;
  // beforeEach(() => {
  //   return signupAdmin().then(user => (adminUser = user));
  // });

  it('returns a random synonym', () => {

    let word = 'hot';
    return randomWord(word)
      .then(res => {
        expect(res).toEqual(expect.any(String));
      });
  });

  it('splits a sentence into words', () => {
    const sentence = 'this is a random sentence';
    const result = splitString(sentence);
    
    expect(result).toEqual(['this', 'is', 'a', 'random', 'sentence']);
  });

  it('joins an array of words as one string', () => {
    const input = ['this', 'is', 'a', 'random', 'sentence'];
    const result = joinString(input);

    expect(result).toEqual('this is a random sentence');
  });

  it('', () => {

  });
});