const Query = require('../../lib/models/query');
const { signupAdmin, signupUser } = require('../../lib/middleware/signup-admin');
const request = require('../request');
const db = require('../db');


describe('Tests roles and ensure-role functionality', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('queries'));

  let adminUser = null;
  beforeEach(() => {
    return signupAdmin().then(user => (adminUser = user));
  });

  const query1 = {
    input: 'This is our string',
    output: 'This is out output string.',
  };

  function postQuery(query) {
    return request
      .post('/api/queries')
      .set('Authorization', adminUser.token)
      .send(query)
      .expect(200)
      .then(({ body }) => body);
  }
  it('post query to db', () => {
    
      return postQuery(query1).then(query => {
        return request
      })
    //post
    //get
  });
});