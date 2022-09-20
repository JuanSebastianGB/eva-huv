/* eslint-disable jest/lowercase-name */
/* eslint-disable jest/valid-describe */
/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-test-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable jest/no-hooks */

const chai = require('chai');
const request = require('supertest');
const app = require('../server');

const { expect } = chai;
const { Area, Service } = require('../models');

const truncateModels = async () => {
  await Area.destroy({ where: {}, force: true });
  await Service.destroy({ where: {}, force: true });
};

describe('API', () => {
  beforeEach(async () => truncateModels());
  describe('Get /services Get all', async () => {
    it('returns the services', async () => {
      const { body, status } = await request(app)
        .get('/services')
        .set('skip', true);
      const { data } = body;
      expect(status).to.equal(200);
      expect(Array.isArray(body)).to.equal(true);
    });
  });
  describe('Get /services Get By Id', async () => {
    it('returns the services', async () => {
      const { body, status } = await request(app)
        .get('/services/id')
        .set('skip', true);
      const { data } = body;
      expect(status).to.equal(200);
      expect(typeof body).to.equal('object');
    });
  });
  describe('Post /services', async () => {
    it('create a new service called test service', async () => {
      const { body, status } = await request(app)
        .post('/services')
        .send({ name: 'test service' })
        .set('skip', true);
      const { response } = body;
      const { id } = response;
      await expect(status).to.equal(201);
      await expect(typeof body).to.equal('object');
    });
  });
  describe('Delete /services/:id', () => {
    it('Delete an specific service successfully', async () => {
      const { body } = await request(app)
        .post('/services')
        .send({ name: 'test service' })
        .set('skip', true);
      const { response } = body;
      const { id } = response;
      const { body: bodyDelete, status } = await request(app)
        .delete(`/services/${id}`)
        .set('skip', true);
      const { response: responseDelete } = bodyDelete;
      await expect(responseDelete).to.equal(1);
      await expect(status).to.equal(200);
    });
    it("Delete an specific service when this doesn't exists", async () => {
      const { body, status } = await request(app)
        .delete('/services/1')
        .set('skip', true);
      const { err } = body;
      await expect(err).to.equal('Not Found');
      await expect(status).to.equal(401);
    });
    it('PUT /services/1 must change the content of an specific service', async () => {
      const originalName = 'test service';
      const changedName = 'test service changed';
      const { body } = await request(app)
        .post('/services')
        .send({ name: originalName })
        .set('skip', true);
      const { response } = body;
      const { id } = response;

      const { status } = await request(app)
        .put(`/services/${id}`)
        .send({ name: changedName })
        .set('skip', true);

      const { body: serviceChanged } = await request(app)
        .get(`/services/${id}`)
        .set('skip', true);

      console.log(serviceChanged.service.name);
      await expect(status).to.equal(200);
      await expect(serviceChanged.service.name).to.equal(changedName);
    });
  });
});
