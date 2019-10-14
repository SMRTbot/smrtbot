const datamuse = require('datamuse');

// const testString = 'the quick brown fox jumped over the lazy dog';

const testWord = 'quick';

datamuse.words({
  // ml: `${testWord}`,
  rel_syn: `${testWord}`
})
  .then((json) => {
    let x = Math.floor(Math.random() * (json.length));
    console.log(json[x].word);
    
  });
 
// const randomWord = require('../middleware/randomWord');

// let word = req.body;

// randomWord(word)
//   .then(body => {
//     console.log(body);
//   });