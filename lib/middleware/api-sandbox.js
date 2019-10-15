const datamuse = require('datamuse');
const { passThrough } = require('../pass-through');

// const testString = 'the quick brown fox jumped over the lazy dog';

const word = 'quick';

datamuse.words({
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
        console.log(json[x].word);
        return json[x].word;
      });
  })
  .catch(() => word);


// const randomWord = require('../middleware/randomWord');

// let word = req.body;

// randomWord(word)
//   .then(body => {
//     console.log(body);
//   });