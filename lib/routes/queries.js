const router = require('express').Router();
const Query = require('../models/query');
const tokenService = require('../token-service');
const ensureAuth = require('../middleware/ensure-auth');
const ensureRole = require('../middleware/ensure-role');

router
  .post('/', (req, res, next) => {
    req.body.userRef = req.user.id;
    Query.create(req.body)
      .then(query => res.json(query))
      .catch(next);
  });
