const { signupAdmin } = require('../../lib/middleware/signup-admin');
const request = require('../request');
const db = require('../db');

describe('soundsLike function route implementation', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('queries'));

  let admin = null;
  beforeEach(() => {
    return signupAdmin().then(user => (admin = user));
  });

  const query = {
    input: 'She sells seashells by the seashore'
  };

  function postQuery(query) {
    return request
      .post('/api/queries')
      .set('Authorization', admin.token)
      .send(query)
      .expect(200)
      .then(({ body }) => body);
  }

  function getQuery(query) {
    return request
      .get(`/api/queries/${query._id}`)
      .set('Authorization', admin.token)
      .expect(200);
  }

  it.skip('posts a similar sounding query', () => {
    return postQuery(query)
      .then(query => {
        return getQuery(query);
      })
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            ...body,
            _id: expect.any(String),
            userRef: expect.any(String),
            output: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "input": "She sells seashells by the seashore",
            "output": Any<String>,
            "userRef": Any<String>,
          }
        `
        );
      });
  });
});