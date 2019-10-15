const { transform, randomWord } = require('./randomWord');
const soundsLike = require('./sounds-like');
const shortWord = require('./shortWord');
const longWord = require('./long-word');
const randomAnt = require('./randomAnt');

module.exports = () => (req, res, next) => {
  const { input } = req.body;
  let filter = randomAnt;

  if(!input) {
    return next({
      statusCode: 400,
      error: 'input must be supplied'
    });
  }

  transform(input, filter)
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

// .then(transformedWords => {
//   transformedWords = req.body.output;
// });
