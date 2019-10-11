const Query = require('../../lib/models/query');
const {
  signupAdmin,
  signupUser
} = require('../../lib/middleware/signup-admin');
const request = require('../request');
const db = require('../db');

describe('Tests roles and ensure-role functionality', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('queries'));

  let adminUser = null;
  beforeEach(() => {
    return signupAdmin().then(user => (adminUser = user));
  });

  const query1 = {
    input: 'This is our string',
    output: 'This is our output string.'
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
    return postQuery(query1)
      .then(query => {
        return request
          .get(`/api/queries/${query._id}`)
          .set('Authorization', adminUser.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            ...body,
            _id: expect.any(String)
            // userRef: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "input": "This is our string",
            "output": "This is our output string.",
          }
        `
        );
      });
  });

  it('deletes a query', () => {
    return postQuery(query1)
      .then(query => {
        return request
          .delete(`/api/queries/${query._id}`)
          .set('Authorization', adminUser.token)
          .expect(200);
      }); 
  });
});
