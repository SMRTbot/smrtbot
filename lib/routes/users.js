const router = require('express').Router();
const User = require('../models/user');
const ensureRole = require('../middleware/ensure-role');

router
  .get('/', ensureRole(), (req, res, next) => {
    User.find()
      .then(users => res.json(users))
      .catch(next);
  })

  .get('/:id', ensureRole(), (req, res, next) => {
    User.findById(req.params.id)
      .then(users => res.json(users))
      .catch(next);
  });

module.exports = router;