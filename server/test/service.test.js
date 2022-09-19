const chai = require('chai');
const request = require('supertest');
const app = require('../server.js');

// import app from '../server';

describe('API', () => {
  describe('get /services', () => {
    it('returns the services', (done) => {
      request(app)
        .get('/services')
        .set('skip', true)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          console.log(res._body);
          if (err) throw err;
          return done();
        });
    });
  });
});
