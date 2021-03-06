const datamuse = require('datamuse');
const { passThrough, profanity } = require('../pass-through');

function longWord(word) {
  if(passThrough.includes(word)) {
    return Promise.resolve(word);
  }
  if(profanity.includes(word)) {
    return Promise.resolve('%$#@&*!');
  }
  return datamuse.words({
    rel_syn: `${word}`
  })
    .then((json) => {
      let words = [];
      for(let i = 0; i < json.length; i++) {
        words.push(json[i].word);
      }
      return Promise.all(words.map(word => {
        return word.length;
      }))
        .then((lengths) => {
          let x = lengths.indexOf(Math.max(...lengths));
          return json[x].word;
        });
    })
    .catch(() => word);
}

module.exports = longWord;