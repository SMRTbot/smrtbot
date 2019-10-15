const datamuse = require('datamuse');

function longestWord(word) {
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