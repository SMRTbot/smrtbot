const datamuse = require('datamuse');

function randomWord(word) {
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
  //must be done as a async promise
  return Promise.all(input.map(word => {
    return filter(word);
    // return input.map(filter());

  })
  );
  //return input word if err
  //else return xformed word
}

function transform(input, filter) {
  const words = splitString(input);
  const transformedWords = arrayMap(words, filter);

  return joinString(transformedWords);
}

module.exports = {
  randomWord,
  splitString,
  joinString,
  arrayMap,
  transform
};
