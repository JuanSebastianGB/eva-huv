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
const { v4: uuidv4 } = require('uuid');

const { expect } = chai;
const { Area, Service } = require('../models');

const ENDPOINT = '/services';

/**
 * It takes an array of Sequelize models and truncates them
 * @param models - An array of models to truncate.
 */
const truncateModels = async (models) => {
  models.map((model) => {
    model.destroy({ where: {}, force: true });
  });
};

/**
 * It creates a test and returns the status and data
 * @param toCreate - The object to create.
 * @returns An object with a status and data property.
 */
const createOneTest = async (endpoint, toCreate) => {
  const { status, body } = await request(app)
    .post(endpoint)
    .send(toCreate)
    .set('skip', true);
  const { response: data } = body;
  return { status, data };
};

/**
 * It makes a GET request to the `/services/:id` endpoint, and returns the status code and the data
 * returned by the endpoint
 * @param id - the id of the test you want to get
 * @returns The status code and the data from the response body.
 */
const getOneTest = async (endpoint, id) => {
  const response = await request(app)
    .get(`${endpoint}/${id}`)
    .set('skip', true);
  const { status, body } = response;
  const { service: data } = body;
  return { status, data };
};

/**
 * It makes a GET request to the `/api/v1/test` endpoint, and returns the response status and body
 * @returns { status, data }
 */
const getAllTest = async (endpoint) => {
  const response = await request(app).get(endpoint).set('skip', true);
  const { status, body: data } = response;
  return { status, data };
};

/**
 * It sends a DELETE request to the `/tests/:id` endpoint, and returns the response body, status code,
 * and error message (if any)
 * @param id - The id of the test you want to delete
 * @returns The data, status, and err are being returned.
 */
const deleteOneTest = async (endpoint, id) => {
  const { body, status } = await request(app)
    .delete(`${endpoint}/${id}`)
    .set('skip', true);
  const { response: data } = body;
  const { err } = body;
  return { data, status, err };
};

/**
 * It sends a PUT request to the `/tests/:id` endpoint with the `id` and `toUpdate` parameters, and
 * returns the response data and status code
 * @param id - the id of the test you want to update
 * @param toUpdate - The object that will be used to update the test.
 * @returns The data and status of the request.
 */
const updateOneTest = async (endpoint, id, toUpdate) => {
  const {
    body: { response: data },
    status,
  } = await request(app)
    .put(`${endpoint}/${id}`)
    .send(toUpdate)
    .set('skip', true);
  return { data, status };
};

describe('API', () => {
  beforeEach(async () => {
    const models = [Area, Service];
    truncateModels(models);
  });
  describe('Get /services Get all', async () => {
    it('returns the rows', async () => {
      await createOneTest(ENDPOINT);
      const { status, data } = await getAllTest(ENDPOINT);
      expect(status).to.equal(200);
      expect(Array.isArray(data)).to.equal(true);
    });
  });
  describe('Get /services Get By Id', async () => {
    it('return the row by id', async () => {
      const response = await createOneTest(ENDPOINT, { name: uuidv4() });
      const { id } = response.data;
      const { status, data } = await getOneTest(ENDPOINT, id);
      expect(status).to.equal(200);
      expect(typeof data).to.equal('object');
    });
    it("undefined when try to get a row that doesn't exist", async () => {
      const { data, status } = await getOneTest(ENDPOINT, 'h');
      await expect(status).to.equal(200);
      await expect(data).to.equal(undefined);
    });
  });
  describe('Post /services', async () => {
    it('create a new row called created', async () => {
      const { data, status } = await createOneTest(ENDPOINT, {
        name: 'created',
      });
      const { id } = data;
      await expect(status).to.equal(201);
      await expect(typeof data).to.equal('object');
      await expect(data.name).to.equal('created');
    });
    it('create 5 rows successfully', async () => {
      for (let index = 0; index < 2; index++) {
        await createOneTest(ENDPOINT, { name: uuidv4() });
      }
      const { status, data } = await getAllTest(ENDPOINT);
      await expect(data.length).to.equal(2);
    });
  });
  describe('Delete /services/:id', () => {
    it('Delete an specific row by id successfully', async () => {
      let response = await createOneTest(ENDPOINT, { name: uuidv4() });
      const { id } = response.data;
      let { data, status } = await deleteOneTest(ENDPOINT, id);
      await expect(data).to.equal(1);
      await expect(status).to.equal(200);
    });
    it("Error when try to delete a row that doesn't exists", async () => {
      const { err, status } = await deleteOneTest(ENDPOINT, 999999);
      await expect(err).to.equal('Not Found');
      await expect(status).to.equal(401);
    });
  });
  describe('PUT /services/id', () => {
    it('Update a row successfully', async () => {
      const newService = await createOneTest(ENDPOINT, { name: uuidv4() });
      const { status } = await updateOneTest(ENDPOINT, newService.data.id, {
        name: 'updated',
      });
      const { data } = await getOneTest(ENDPOINT, newService.data.id);
      await expect(status).to.equal(200);
      await expect(data.name).to.equal('updated');
    });
    it("Error when try to update a  a row that doesn't exists", async () => {
      const { data, status } = await updateOneTest(ENDPOINT, 'h');
      await expect(status).to.equal(401);
      await expect(data).to.equal(undefined);
    });
  });
});
