const router = require('express').Router();
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    User.find()
      .then(users => res.json(users))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(users => res.json(users))
      .catch(next);
  });

module.exports = router;