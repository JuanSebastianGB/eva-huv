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

/**
 * It creates a service and returns the status and data
 * @returns { status, data }
 */
const createServiceTest = async () => {
  const { status, body } = await request(app)
    .post('/services')
    .send({ name: 'new service' })
    .set('skip', true);
  const { response: data } = body;
  return { status, data };
};

/**
 * It makes a GET request to the `/services/:id` endpoint,
 * and returns the status code and the service object
 * @param id - The id of the service you want to get.
 * @returns An object with a status and a service.
 */
const getOneServiceTest = async (id) => {
  const response = await request(app).get(`/services/${id}`).set('skip', true);
  const { status, body } = response;
  const { service: data } = body;
  return { status, data };
};

/**
 * It makes a GET request to the `/services` endpoint, and returns the status code and the data from
 * the response
 * @returns An object with a status and data property.
 */
const getAllServicesTest = async () => {
  const response = await request(app).get('/services').set('skip', true);
  const { status, body: data } = response;
  return { status, data };
};

/**
 * It sends a DELETE request to the `/services/:id` endpoint, and returns the response body, status
 * code, and error message
 * @param id - The id of the service you want to delete.
 * @returns An object with the data, status, and err.
 */
const deleteOneServiceTest = async (id) => {
  const { body, status } = await request(app)
    .delete(`/services/${id}`)
    .set('skip', true);
  const { response: data } = body;
  const { err } = body;
  return { data, status, err };
};

/**
 * It sends a PUT request to the `/services/:id` endpoint with the `id` of the service we want to
 * update, and the new name of the service
 * @param id - the id of the service you want to update
 */
const updateOneServiceTest = async (id) => {
  const {
    body: { response: data },
    status,
  } = await request(app)
    .put(`/services/${id}`)
    .send({ name: 'service changed' })
    .set('skip', true);
  return { data, status };
};

describe('API', () => {
  beforeEach(async () => truncateModels());
  describe('Get /services Get all', async () => {
    it('returns the services', async () => {
      await createServiceTest();
      const { status, data } = await getAllServicesTest();
      expect(status).to.equal(200);
      expect(Array.isArray(data)).to.equal(true);
    });
  });
  describe('Get /services Get By Id', async () => {
    it('returns the services', async () => {
      const response = await createServiceTest();
      const { id } = response.data;
      const { status, data } = await getOneServiceTest(id);
      expect(status).to.equal(200);
      expect(typeof data).to.equal('object');
    });
  });
  describe('Post /services', async () => {
    it('create a new service called test service', async () => {
      const { data, status } = await createServiceTest();
      const { id } = data;
      await expect(status).to.equal(201);
      await expect(typeof data).to.equal('object');
    });
  });
  describe('Delete /services/:id', () => {
    it('Delete an specific service successfully', async () => {
      let response = await createServiceTest();
      const { id } = response.data;
      let { data, status } = await deleteOneServiceTest(id);
      await expect(data).to.equal(1);
      await expect(status).to.equal(200);
    });
    it("Delete an specific service when this doesn't exists", async () => {
      const { err, status } = await deleteOneServiceTest(999999);
      await expect(err).to.equal('Not Found');
      await expect(status).to.equal(401);
    });
  });
  describe('PUT /services/id', () => {
    it('Update a service successfully', async () => {
      const newService = await createServiceTest();
      const { status } = await updateOneServiceTest(newService.data.id);
      const { data } = await getOneServiceTest(newService.data.id);
      await expect(status).to.equal(200);
      await expect(data.name).to.equal('service changed');
    });
  });
});
