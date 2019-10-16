const datamuse = require('datamuse');
const { passThrough } = require('../pass-through');

function randomWord(word) {
  if(passThrough.includes(word)) {
    return Promise.resolve(word);
  }
  else
    return datamuse.words({
      rel_syn: `${word}`
    })
      .then((json) => {
        let x = Math.floor(Math.random() * (json.length));
        return json[x].word;
      })
      .catch(() => word);
}

function splitString(input) {
  return input.split(' ');
}

function joinString(input) {
  return input.join(' ');
}

function arrayMap(input, filter) {
  return Promise.all(input.map(word => {
    return filter(word);
  }));
}

function transform(input, filter) {
  const words = splitString(input);
  return arrayMap(words, filter)
    .then(transformedWords => {
      return joinString(transformedWords);
    })
    .then(transformedWords => {
      return transformedWords;
    });
}

module.exports = {
  randomWord,
  splitString,
  joinString,
  arrayMap,
  transform
};