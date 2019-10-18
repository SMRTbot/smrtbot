const randomWord = require('../services/random-word');
const soundsLike = require('../services/sounds-like');
const shortWord = require('../services/short-word');
const longWord = require('../services/long-word');
const randomAnt = require('../services/random-antonym');
const spelledLike = require('../services/spelled-like');
const rhyme = require('../services/rhyme');
const homophone = require('../services/homophone');
const vowels = require('../services/vary-vowel');
const esRandomWord = require('../services/es-random-word');
const { transform } = require('../../util/helper-functions');

module.exports = () => (req, res, next) => {
  const { input, filter } = req.body;
  const filterKey = {
    smart: longWord,
    short: shortWord,
    sound: soundsLike,
    antonym: randomAnt,
    funny: randomWord,
    spelling: spelledLike,
    rhyme: rhyme,
    homophone: homophone,
    vowels: vowels,
    gracioso: esRandomWord
  };
  let filterChoice = filterKey[filter] || longWord;

  if(!input) {
    return next({
      statusCode: 400,
      error: 'input must be supplied'
    });
  }

  transform(input, filterChoice)
    .then(output => {
      if(!output) {
        throw {
          statusCode: 400,
          error: 'output must be resolvable to input'
        };
      }

      req.body.output = output;
      next();
    })
    .catch(next);
};