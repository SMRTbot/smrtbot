/* eslint-disable no-useless-escape */


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
  const cleanInput = input.replace(/[.,\/#!$%\^&*;:{}=\-_`~()\?]/g, '');
  const words = splitString(cleanInput);
  return arrayMap(words, filter)
    .then(transformedWords => {
      return joinString(transformedWords);
    })
    .then(transformedWords => {
      return transformedWords;
    });
}

module.exports = { 
  transform,
  splitString,
  joinString,
  arrayMap
};