const datamuse = require('datamuse');

function soundsLike(word) {
  return datamuse.words({
    sl: `${word}`
  })
    .then((json) => {
      let x = Math.floor(Math.random() * (json.length));
      return json[x].word;
    })
    .catch(() => word);
}

module.exports = soundsLike;