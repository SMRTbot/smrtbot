const datamuse = require('datamuse');
const passThrough = require('../pass-through');

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

module.exports = randomWord;