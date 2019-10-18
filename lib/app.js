const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

const ensureAuth = require('../lib/middleware/ensure-auth');
const ensureRole = require('../lib/middleware/ensure-role');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(express.json());
app.use(morgan('dev'));
app.use(checkConnection);

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const auth = require('./routes/auth');
const queries = require('./routes/queries');
const users = require('./routes/users');
const me = require('./routes/me');
app.use('/api/auth', auth);
app.use('/api/queries', ensureAuth(), queries);
app.use('/api/users', ensureAuth(), ensureRole(), users);
app.use('/api/me', ensureAuth(), me);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;