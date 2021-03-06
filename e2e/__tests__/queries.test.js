const { signupAdmin } = require('../../lib/middleware/signup-admin');
const request = require('../request');
const db = require('../db');
jest.mock('datamuse', ()=> {
  return { words: ()=> {
    return Promise.resolve([
      {
        'word': 'test',
        'score': 1840
      },
      {
        'word': 'test',
        'score': 1190
      }
    ]);
  } };
});

describe('Tests roles and ensure-role functionality', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('queries'));

  let adminUser = null;
  beforeEach(() => {
    return signupAdmin().then(user => (adminUser = user));
  });

  const query1 = {
    input: 'This is our string',
    output: 'this is a mock string'
  };

  // addOutput.mockResolvedValue({
  //   input: 'This is our string',
  //   output: 'this is a mock string'
  // });
  
  
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
            _id: expect.any(String),
            userRef: expect.any(String),
            output: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "input": "This is our string",
            "output": Any<String>,
            "userRef": Any<String>,
          }
        `
        );
      });
  });

  it('deletes a query', () => {
    return postQuery(query1).then(query => {
      return request
        .delete(`/api/queries/${query._id}`)
        .set('Authorization', adminUser.token)
        .expect(200);
    });
  });

  it('gets a list of all queries', () => {
    return Promise.all([
      postQuery({
        input: 'This is query one',
        output: 'This is our output string.'
      }),
      postQuery({
        input: 'This is query two',
        output: 'This is our output string.'
      })
    ])
      .then(() => {
        return request
          .get('/api/queries')
          .set('Authorization', adminUser.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            input: expect.any(String),
            userRef: expect.any(String),
            output: expect.any(String)
          },

          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "input": Any<String>,
            "output": Any<String>,
            "userRef": Any<String>,
          }
        `
        );
      });
  });
});
