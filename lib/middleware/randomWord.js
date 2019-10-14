const datamuse = require('datamuse');




module.exports = function randomWord(word) {
  return datamuse.words({
    rel_syn: `${word}`
  })
    .then((json) => {
      let x = Math.floor(Math.random() * (json.length));
      console.log(json[x].word);
      
      return json[x].word;
    });
};

