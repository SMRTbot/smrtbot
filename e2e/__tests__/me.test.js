const { signupUser } = require('../../lib/middleware/signup-admin');
const request = require('../request');
const db = require('../db');

describe('User me routes', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('queries'));

  let testUser = null;
  beforeEach(() => {
    return signupUser().then(user => (testUser = user));
  });

  const query1 = {
    input: 'This is our string',
    output: 'This is our output string.'
  };

  function postQuery(query) {
    return request
      .post('/api/queries')
      .set('Authorization', testUser.token)
      .send(query)
      .expect(200)
      .then(({ body }) => body);
  }

  it.skip('can add to user favorites', () => {
    return postQuery(query1)
      .then(query => {
        return request
          .put(`/api/me/favorites/${query._id}`)
          .set('Authorization', testUser.token)
          .send(testUser)
          .expect(200);
      })
      .then(({ body }) => {
        console.log(body);
        expect(body.length).toBe(1);
        expect(body).toMatchInlineSnapshot(
          [expect.any(String)],

          `
          Object {
            "0": "5da112b7dffca02f9ba8401c",
          }
        `
        );
      });
  });

  it('get a list of user favorites', () => {});
});

// POST string
// PUT favorites
// GET favorites
