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
    input: 'This is our string'
  };
  const query2 = {
    input: 'This is another string'
  };

  function postQuery(query) {
    return request
      .post('/api/queries')
      .set('Authorization', testUser.token)
      .send(query)
      .expect(200)
      .then(({ body }) => body);
  }

  it.only('can add to user favorites', () => {
    return postQuery(query1)
      .then(query => {
        return request
          .put(`/api/me/favorites/${query._id}`)
          .set('Authorization', testUser.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body[0]).toEqual(expect.any(String));
      });
  });

  it('get a list of user favorites', () => {
    return Promise.all([
      postQuery(query1),
      postQuery(query2)
    ])
      .then(([query1, query2]) => {
        return request
          .put(`/api/me/favorites/${query1._id}`)
          .set('Authorization', testUser.token)
          .then(() => {
            return request
              .put(`/api/me/favorites/${query2._id}`)
              .set('Authorization', testUser.token)
              .then(() => {
                return request
                  .get(`/api/me/favorites/${testUser._id}`)
                  .set('Authorization', testUser.token)
                  .expect(200)
                  .then(({ body }) => {
                    expect(body.length).toBe(2);
                  });
              });
          });

      });
    
  });

  it('deletes a query from favorites', () => {
    return postQuery(query1)
      .then(query => {
        return request
          .delete(`/api/me/favorites/${query._id}`)
          .set('Authorization', testUser.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(0);
      });
  });

});
