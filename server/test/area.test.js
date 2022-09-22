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
const { v4: uuidv4 } = require('uuid');
const {
  truncateModels,
  createOneTest,
  getAllTest,
  getOneTest,
  deleteOneTest,
  updateOneTest,
} = require('./tesstUtils');
const app = require('../server');

const { expect } = chai;
const { Service } = require('../models');

const ENDPOINT = '/areas';
let serviceId;

describe('API Areas', async () => {
  beforeEach(async () => {
    const models = [Service];
    truncateModels(models);
    const { data, status } = await createOneTest('/services', {
      name: uuidv4(),
    });
    serviceId = data.id;
  });
  describe('Get /areas Get all', async () => {
    it('returns the rows', async () => {
      await createOneTest(ENDPOINT, { name: uuidv4(), serviceId });
      const { status, data } = await getAllTest(ENDPOINT);
      await expect(status).to.equal(200);
      await expect(Array.isArray(data)).to.equal(true);
      await expect(data.length).to.equal(1);
    });
  });
  describe('Get /areas Get By Id', async () => {
    it('return the row by id', async () => {
      const response = await createOneTest(ENDPOINT, {
        name: uuidv4(),
        serviceId,
      });
      const { id } = await response.data;
      const { status, data } = await getOneTest(ENDPOINT, id);
      expect(status).to.equal(200);
      expect(typeof data).to.equal('object');
    });
    it('Error when try to get an area when id is not a number', async () => {
      const { data, status, err } = await getOneTest(ENDPOINT, 'h');
      await expect(status).to.equal(400);
      await expect(err).to.equal('id must be a number');
    });
    it("undefined when try to get a row that doesn't exist", async () => {
      const { data, status } = await getOneTest(ENDPOINT, 99999999);
      await expect(status).to.equal(200);
      await expect(data).to.equal(undefined);
    });
  });
  describe('Post /areas', async () => {
    it('create a new row called created', async () => {
      const { data, status } = await createOneTest(ENDPOINT, {
        name: 'created',
        serviceId,
      });

      const { id } = data;
      await expect(status).to.equal(201);
      await expect(typeof data).to.equal('object');
      await expect(data.name).to.equal('created');
    });
    it('create 5 rows successfully', async () => {
      const promises = [];
      Promise.all();
      for (let index = 0; index < 5; index += 1) {
        promises.push(createOneTest(ENDPOINT, { name: uuidv4(), serviceId }));
      }
      const result = await Promise.all(promises);
      const { status, data } = await getAllTest(ENDPOINT);
      await expect(data.length).to.equal(5);
    });
  });
  describe('Delete /areas/:id', () => {
    it('Delete an specific row by id successfully', async () => {
      const response = await createOneTest(ENDPOINT, {
        name: uuidv4(),
        serviceId,
      });
      const { id } = response.data;
      const { data, status } = await deleteOneTest(ENDPOINT, id);
      await expect(data).to.equal(1);
      await expect(status).to.equal(200);
    });
    it("Error when try to delete a row that doesn't exists", async () => {
      const { err, status } = await deleteOneTest(ENDPOINT, 999999);
      await expect(err).to.equal('Not Found');
      await expect(status).to.equal(400);
    });
  });
  describe('PUT /services/id', () => {
    it('Update a row successfully', async () => {
      const newRow = await createOneTest(ENDPOINT, {
        name: uuidv4(),
        serviceId,
      });
      const { status } = await updateOneTest(ENDPOINT, newRow.data.id, {
        name: 'updated',
        serviceId,
      });
      const { data } = await getOneTest(ENDPOINT, newRow.data.id);
      await expect(status).to.equal(201);
      await expect(data.name).to.equal('updated');
    });
    it("Error when try to update a  a row that doesn't exists", async () => {
      const { data, status, err } = await updateOneTest(ENDPOINT, 'h', {
        name: 'updated',
      });
      await expect(status).to.equal(400);
      await expect(err).to.equal('Not Found');
    });
  });
});
