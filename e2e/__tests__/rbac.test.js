const { signupUser, signupAdmin } = require('../../lib/middleware/signup-admin');
const request = require('../request');
const { dropCollection } = require('../db');

describe('Tests roles and ensure-role functionality', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('dogs'));

  let adminUser = null;
  beforeEach(() => {
    return signupAdmin().then(user => (adminUser = user));
  });

  let testUser = null;
  beforeEach(() => {
    return signupUser().then(user => (testUser = user)
    );
  });

  it('Makes a user an Admin', () => {
    return request
      .put(`/api/auth/users/${testUser._id}/roles/admin`)
      .set('Authorization', adminUser.token)
      .expect(200)
      .then(({ body }) => {
        expect(body.roles[0]).toBe('admin');
      });
  });

  it('Allows admin to delete user', () => {
    return request
      .delete(`/api/auth/users/${testUser._id}`)
      .set('Authorization', adminUser.token)
      .expect(200);
  });

  it('Remove admin role', () => {
    return request
      .put(`/api/auth/users/${testUser._id}/roles/admin`)
      .set('Authorization', adminUser.token)
      .then(() => {
        return request
          .delete(`/api/auth/users/${testUser._id}/roles/${'admin'}`)
          .set('Authorization', adminUser.token)
          .expect(200)
          .then(() => {
            return request
              .get(`/api/users/${testUser._id}`)
              .set('Authorization', adminUser.token)
              .expect(200)
              .then(({ body }) => {
                expect(body.roles).toEqual([]);
              });
          });
      });
  });

  it('get all users', () => {
    return request
      .get('/api/users')
      .set('Authorization', adminUser.token)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
      });
  });
});
