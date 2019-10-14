const datamuse = require('datamuse');

function randomWord(word) {
  return datamuse.words({
    rel_syn: `${word}`
  })
    .then((json) => {
      let x = Math.floor(Math.random() * (json.length));
      console.log(json[x].word);

      return json[x].word;
    });
}

function splitString(input) {
  return input.split(' ');
}

function joinString(input) {
  return input.join(' ');
}

function arrayMap(input, filter) {
//must be done as a async promise

//return input word if err
//else return xformed word
}

module.exports = {
  randomWord,
  splitString,
  joinString,
  arrayMap
};
