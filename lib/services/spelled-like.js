const datamuse = require('datamuse');
const { passThrough, profanity } = require('../pass-through');

function spelledLike(word) {
  if(passThrough.includes(word)) {
    return Promise.resolve(word);
  }
  if(profanity.includes(word)) {
    return Promise.resolve('%$#@&*!');
  }
  return datamuse.words({
    sp: `${word}`
  })
    .then((json) => {
      let x = Math.floor(Math.random() * (json.length));
      return json[x].word;
    })
    .catch(() => word);
}

module.exports = spelledLike;