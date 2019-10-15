const datamuse = require('datamuse');
const passThrough = require('../pass-through');

function longestWord(word) {
  if(word.includes(passThrough)) {
    return word;
  }
  return datamuse.words({
    rel_syn: `${word}`
  })
    .then((json) => {
      let x = Math.floor(Math.random() * (json.length));
      console.log(json[x].word);
      

      return json[x].word;
    })
    .catch(() => word);
}

module.exports = {
  longestWord
};