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
const { Service } = require('../models');

const ENDPOINT = '/areas';
let serviceId;

describe('API Areas', async () => {
  beforeEach(async () => {
    const models = [Service];
    truncateModels(models);
    const { data, status } = await createOneRow('/services', {
      name: uuidv4(),
    });
    serviceId = data.id;
  });
  describe('Get /areas Get all', async () => {
    it('returns the rows', async () => {
      await createOneRow(ENDPOINT, { name: uuidv4(), serviceId });
      const { status, data, err } = await getAllRow(ENDPOINT);
      await expect(status).to.equal(200);
      await expect(Array.isArray(data)).to.equal(true);
      await expect(data.length).to.equal(1);
      await expect(err).to.equal(undefined);
    });
  });
  describe('Get /areas Get By Id', async () => {
    it('return the row by id', async () => {
      const response = await createOneRow(ENDPOINT, {
        name: uuidv4(),
        serviceId,
      });
      const { id } = await response.data;
      const { status, data, err } = await getOneRow(ENDPOINT, id);
      expect(status).to.equal(200);
      expect(typeof data).to.equal('object');
      await expect(err).to.equal(undefined);
    });
    it('Error when try to get an area when id is not a number', async () => {
      const { data, status, err } = await getOneRow(ENDPOINT, 'h');
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
    // });
    describe('Post /areas', async () => {
      it('create a new row called created', async () => {
        const { status, data, err } = await createOneRow(ENDPOINT, {
          name: 'created',
          serviceId,
        });

        const { id } = data;
        await expect(status).to.equal(201);
        await expect(typeof data).to.equal('object');
        await expect(data.name).to.equal('created');
        await expect(err).to.equal(undefined);
      });
      // it('create 5 rows successfully', async () => {
      //   const promises = [];
      //   Promise.all();
      //   for (let index = 0; index < 5; index += 1) {
      //     promises.push(createOneRow(ENDPOINT, { name: uuidv4(), serviceId }));
      //   }
      //   const result = await Promise.all(promises);
      //   const { status, data } = await getAllRow(ENDPOINT);
      //   await expect(data.length).to.equal(5);
      // });
    });
    describe('Delete /areas/:id', () => {
      it('Delete an specific row by id successfully', async () => {
        const response = await createOneRow(ENDPOINT, {
          name: uuidv4(),
          serviceId,
        });
        const { id } = response.data;
        const { data, status, err } = await deleteOneRow(ENDPOINT, id);
        await expect(data).to.equal(1);
        await expect(status).to.equal(200);
      });
      it("Error when try to delete a row that doesn't exists", async () => {
        const { data, status, err } = await deleteOneRow(ENDPOINT, 999999);
        await expect(err).to.equal('Not Found');
        await expect(status).to.equal(400);
      });
    });
    describe('PUT /areas/id', () => {
      it('Update a row successfully', async () => {
        const newRow = await createOneRow(ENDPOINT, {
          name: uuidv4(),
          serviceId,
        });
        const { status } = await updateOneRow(ENDPOINT, newRow.data.id, {
          name: 'updated',
          serviceId,
        });
        const { data } = await getOneRow(ENDPOINT, newRow.data.id);
        await expect(status).to.equal(201);
        await expect(data.name).to.equal('updated');
      });
      it("Error when try to update a  a row that doesn't exists", async () => {
        const { data, status, err } = await updateOneRow(ENDPOINT, 'h', {
          name: 'updated',
        });
        await expect(status).to.equal(400);
        await expect(err).to.equal('Not Found');
      });
    });
  });
});
