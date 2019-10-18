const router = require('express').Router();
const Query = require('../models/query');
const ensureRole = require('../middleware/ensure-role');
const addOutput = require('../../lib/middleware/add-output');

router
  .post('/', addOutput(), (req, res, next) => {
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