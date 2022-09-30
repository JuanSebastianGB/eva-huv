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
  createOneRow,
  getAllRow,
  getOneRow,
  deleteOneRow,
  updateOneRow,
} = require('./testUtils');
const app = require('../server');

const { expect } = chai;
const { Guide } = require('../models');

const ENDPOINT = '/guides';

describe('API', () => {
  beforeEach(async () => {
    const models = [Guide];
    truncateModels(models);
  });
  describe(`Get ${ENDPOINT} Get all`, async () => {
    it('returns the rows', async () => {
      await createOneRow(ENDPOINT);
      const { status, data, err } = await getAllRow(ENDPOINT);
      await expect(status).to.equal(200);
      await expect(Array.isArray(data)).to.equal(true);
      // await expect(data.length).to.equal(1);
      await expect(err).to.equal(undefined);
    });
  });
  describe(`Get ${ENDPOINT} Get By Id`, async () => {
    it('return the row by id', async () => {
      const response = await createOneRow(ENDPOINT, { name: uuidv4() });
      const { id } = response.data;
      const { status, data, err } = await getOneRow(ENDPOINT, id);
      await expect(status).to.equal(200);
      await expect(typeof data).to.equal('object');
      await expect(err).to.equal(undefined);
    });
    it('Error when try to get a guide when id is not a number', async () => {
      const { status, data, err } = await getOneRow(ENDPOINT, 'h');
      await expect(status).to.equal(400);
      await expect(err).to.equal('id must be a number');
      await expect(data).to.equal(undefined);
    });
    it("undefined when try to get a row that doesn't exist", async () => {
      const { data, status, err } = await getOneRow(ENDPOINT, 99999999);
      await expect(status).to.equal(200);
      await expect(data).to.equal(undefined);
      await expect(err).to.equal(undefined);
    });
  });
  describe(`Post ${ENDPOINT}`, async () => {
    it('create a new row called created', async () => {
      const { status, data, err } = await createOneRow(ENDPOINT, {
        name: 'created',
      });
      await expect(status).to.equal(201);
      await expect(typeof data).to.equal('object');
      await expect(data.name).to.equal('created');
      await expect(err).to.equal(undefined);
    });
    it('create 5 rows successfully', async () => {
      const promises = [];
      Promise.all();
      for (let index = 0; index < 5; index += 1) {
        promises.push(createOneRow(ENDPOINT, { name: uuidv4() }));
      }
      const result = await Promise.all(promises);
      const { data } = await getAllRow(ENDPOINT);
      await expect(data.length).to.equal(5);
    });
  });
  describe(`Delete ${ENDPOINT}/:id`, () => {
    it('Delete an specific row by id successfully', async () => {
      const response = await createOneRow(ENDPOINT, { name: uuidv4() });
      const { id } = await response.data;
      const { status, data, err } = await deleteOneRow(ENDPOINT, id);
      await expect(status).to.equal(200);
      // await expect(data).to.equal(1);
      await expect(err).to.equal(undefined);
    });
    it("Error when try to delete a row that doesn't exists", async () => {
      const { err, data, status } = await deleteOneRow(ENDPOINT, 999999);
      await expect(err).to.equal('Not Found');
      await expect(status).to.equal(400);
      await expect(data).to.equal(undefined);
    });
  });
  describe(`PUT ${ENDPOINT}/id`, () => {
    it('Update a row successfully', async () => {
      const newRow = await createOneRow(ENDPOINT, { name: uuidv4() });
      const { status, err } = await updateOneRow(ENDPOINT, newRow.data.id, {
        name: 'updated',
      });
      const { data } = await getOneRow(ENDPOINT, newRow.data.id);
      await expect(status).to.equal(200);
      await expect(data.name).to.equal('updated');
      await expect(err).to.equal(undefined);
    });
    it("Error when try to update  a row that doesn't exists", async () => {
      const { data, status, err } = await updateOneRow(ENDPOINT, 9999999999);
      await expect(status).to.equal(400);
      await expect(err).to.equal('Not Found');
    });
    it('Error when try to update a guide when id is not a number', async () => {
      const { data, status, err } = await updateOneRow(ENDPOINT, 'h');
      await expect(status).to.equal(400);
      await expect(err).to.equal('id must be a number');
    });
  });
});
