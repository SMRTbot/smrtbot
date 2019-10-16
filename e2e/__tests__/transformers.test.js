const request = require('../request');
const { dropCollection } = require('../db');
const { signupAdmin } = require('../../lib/middleware/signup-admin');
const { splitString, arrayMap, joinString } = require('../../util/helper-functions');
const randomWord = require('../../lib/middleware/random-word');
const randomAnt = require('../../lib/middleware/random-antonym');
const shortWord = require('../../lib/middleware/short-word');

describe('transform functions middleware', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('queries'));

  describe('randomWord transformer', () => {
    it('returns a random synonym', () => {
      let word = 'hot';
      return randomWord(word)
        .then(res => {
          expect(res).toEqual(expect.any(String));
        });
    });

    it('returns passThrough the', () => {
      let word = 'the';
      return randomWord(word)
        .then(res => {
          expect(res).toEqual(word);
        });
    });
  });

  describe('random antonym transformer', () => {
    it('returns a random antonym', () => {
      let word = 'cold';
      return randomAnt(word)
        .then(res => {
          expect(res).toEqual(expect.any(String));
        });
    });

    it('transforms a string', () => {
      const input = 'the quick brown fox jumped over the lazy dog';
      const arr = splitString(input);
      return arrayMap(arr, randomAnt)
        .then(res => {
          joinString(res);
        },
        expect.any(String));
    });
  });

  describe('short word transformer', () => {
    it('returns a (short) synonym', () => {
      let word = 'victuals';
      return shortWord(word)
        .then(res => {
          expect(res).toEqual('edible');
        });
    });
  });

  describe('sounds-like transformer', () => {
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

    it('posts a similar sounding query', () => {
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
});