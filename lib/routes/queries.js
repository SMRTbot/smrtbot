const router = require('express').Router();
const Query = require('../models/query');
// const tokenService = require('../token-service');
const ensureRole = require('../middleware/ensure-role');
const transform = require('../middleware/add-output');
// const soundsLike = require('../middleware/add-sounds-like');

router
  .post('/', transform(), (req, res, next) => {
    req.body.userRef = req.user.id;
    Query.create(req.body)
      .then(query => res.json(query))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Query.findById(req.params.id)
      .lean()
      .then(query => res.json(query))
      .catch(next);
  })

  .delete('/:id', ensureRole(), ({ params }, res, next) => {
    Query.findByIdAndRemove({
      _id: params.id
    })
      .then(query => res.json(query))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Query.find()
      .lean()
      .then(queries => {
        res.json(queries);
      })
      .catch(next);
  });

module.exports = router;