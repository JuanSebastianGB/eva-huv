const chai = require('chai');
const request = require('supertest');
const app = require('../server.js');
let { Service } = require('../models');

// import app from '../server';
const temporal = [];
describe('API', () => {
  // beforeEach((done) => {
  //   // temporal.push('hi');
  //   // console.log({ msj: 'beforeEach' });
  //   // User.destroy();
  //   // done();
  // });
  describe('get /services', () => {
    it('returns the services', (done) => {
      request(app)
        .get('/services')
        .set('skip', true)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          // console.log(res._body);
          if (err) throw err;
          return done();
        });
    });
  });
  describe('get /services/:id', () => {
    it('returns the services', (done) => {
      request(app)
        .get('/services/1')
        .set('skip', true)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          // console.log(res._body);
          if (err) throw err;
        });
      done();
    });
  });
  describe('post /services', () => {
    it('create a new service', (done) => {
      Service.destroy({ where: { name: 'New service' } });
      request(app)
        .post('/services')
        .send({ name: 'New service' })
        .set('skip', true)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
        });
      return done();
    });
  });
});
