const router = require('express').Router();
const User = require('../models/user');

router
  .get('/favorites/:userId', ({ user }, res, next) => {
    User.findById(user.id)
      .populate({ path: 'favorites', select: 'input output' })
      .lean()
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .put('/favorites/:queryId', ({ user, params }, res, next) => {
    User.updateById(user.id, {
      $addToSet: {
        favorites: params.queryId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .delete('/favorites/:queryId', ({ user, params }, res, next) => {
    User.findByIdAndUpdate(user.id, {
      $pull: {
        favorites: params.queryId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  });

module.exports = router;