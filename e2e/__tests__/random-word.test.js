const { randomWord, splitString, joinString, arrayMap } = require('../../lib/middleware/random-word');
const { dropCollection } = require('../db');

describe('randomWord', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('queries'));

  it('returns a random synonym', () => {
    let word = 'hot';
    return randomWord(word)
      .then(res => {
        expect(res).toEqual(expect.any(String));
      });
  });

  it('expect the', () => {
    let word = 'the';
    return randomWord(word)
      .then(res => {
        expect(res).toEqual(word);
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

  it('returns a transformed array', () => {
    const input = 'the quick brown fox jumped over the lazy dog';
    const arr = splitString(input);
    return arrayMap(arr, randomWord)
      .then(() => {
        expect.any(Array);
      });
  });

  it('transforms a string', () => {
    const input = 'the quick brown fox jumped over the lazy dog';
    const arr = splitString(input);
    return arrayMap(arr, randomWord)
      .then(res => {
        joinString(res);
      },
      expect.any(String));
  });
});