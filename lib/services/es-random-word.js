const datamuse = require('datamuse');
const passThrough = require('../pass-through');

function esRandomWord(word) {
  if(passThrough.includes(word)) {
    return Promise.resolve(word);
  }
  else
    return datamuse.request(`words?v=es&ml=${word}`)
      .then((json) => {
        let x = Math.floor(Math.random() * (json.length));
        return json[x].word;
      })
      .catch(() => word);
}

module.exports = esRandomWord;