const { transform } = require('./random-word');
const soundsLike = require('./sounds-like');

module.exports = () => (req, res, next) => {
  const { input } = req.body;
  let filter = soundsLike;

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