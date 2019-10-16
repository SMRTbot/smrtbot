const datamuse = require('datamuse');
const { passThrough } = require('../pass-through');

function shortWord(word) {
  if(passThrough.includes(word)) {
    return Promise.resolve(word);
  } else
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
            let x = lengths.indexOf(Math.min(...lengths));
            return json[x].word;
          });
      })
      .catch(() => word);
}

module.exports = shortWord;