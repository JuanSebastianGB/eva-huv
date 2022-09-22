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
const { Area, Service } = require('../models');

const ENDPOINT = '/services';

describe('API', () => {
  beforeEach(async () => {
    const models = [Service];
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
    it('Error when try to get a service when id is not a number', async () => {
      const { data, status, err } = await getOneTest(ENDPOINT, 'h');
      await expect(status).to.equal(400);
      await expect(err).to.equal('id must be a number');
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
      const promises = [];
      Promise.all();
      for (let index = 0; index < 5; index += 1) {
        promises.push(createOneTest(ENDPOINT, { name: uuidv4() }));
      }
      const result = await Promise.all(promises);
      const { status, data } = await getAllTest(ENDPOINT);
      await expect(data.length).to.equal(5);
    });
  });
  describe('Delete /services/:id', () => {
    it('Delete an specific row by id successfully', async () => {
      const response = await createOneTest(ENDPOINT, { name: uuidv4() });
      const { id } = await response.data;
      const { status } = await deleteOneTest(ENDPOINT, id);
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
      const newRow = await createOneTest(ENDPOINT, { name: uuidv4() });
      const { status } = await updateOneTest(ENDPOINT, newRow.data.id, {
        name: 'updated',
      });
      const { data } = await getOneTest(ENDPOINT, newRow.data.id);
      await expect(status).to.equal(200);
      await expect(data.name).to.equal('updated');
    });
    it("Error when try to update a  a row that doesn't exists", async () => {
      const { data, status, err } = await updateOneTest(ENDPOINT, 9999999999);
      await expect(status).to.equal(400);
      await expect(err).to.equal('Not Found');
    });
    it('Error when try to update an service when id is not a number', async () => {
      const { data, status, err } = await updateOneTest(ENDPOINT, 'h');
      await expect(status).to.equal(400);
      await expect(err).to.equal('id must be a number');
    });
  });
});
