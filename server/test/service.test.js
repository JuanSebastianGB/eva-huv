const chai = require('chai');
const request = require('supertest');
const app = require('../server.js');
const { expect } = chai;
// let { Service } = require('../models');

// import app from '../server';
describe('API', () => {
  describe('get /services Get all', async () => {
    it('returns the services', async () => {
      const { body, status } = await request(app)
        .get('/services')
        .set('skip', true);
      const { data } = body;
      expect(status).to.equal(200);
      expect(Array.isArray(body)).to.equal(true);
    });
  });
  describe('get /services Get By Id', async () => {
    it('returns the services', async () => {
      const { body, status } = await request(app)
        .get('/services/id')
        .set('skip', true);
      const { data } = body;
      expect(status).to.equal(200);
      expect(typeof body).to.equal('object');
    });
  });

  // describe('delete /services/1', () => {
  //   it('delete a service By Id', (done) => {
  //     request(app)
  //       .delete('/services/1')
  //       .set('skip', true)
  //       .expect('Content-Type', '/json/')
  //       .expect(200)
  //       .end((err, res) => {
  //         const { text } = res;
  //         const response = JSON.parse(text);
  //         console.log({ response });
  //         done();
  //       });
  //   });
  // });
  // describe('post /services', () => {
  //   it('create a new service', (done) => {
  //     Service.destroy({ where: { name: 'New service' } });
  //     request(app)
  //       .post('/services')
  //       .send({ name: 'New service' })
  //       .set('skip', true)
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .end((err, res) => {
  //         if (err) throw err;
  //       });
  //     return done();
  //   });
  // });
});
