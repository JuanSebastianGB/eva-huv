const request = require('supertest');
const app = require('../server');

/**
 * It takes an array of Sequelize models and truncates them
 * @param models - An array of models to truncate.
 */
exports.truncateModels = async (models) => {
  models.map((model) => model.destroy({ where: {}, force: true }));
};

/**
 * It creates a test and returns the status and data
 * @param toCreate - The object to create.
 * @returns An object with a status and data property.
 */
exports.createOneTest = async (endpoint, toCreate) => {
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
exports.getOneTest = async (endpoint, id) => {
  const response = await request(app)
    .get(`${endpoint}/${id}`)
    .set('skip', true);
  const { status, body } = response;
  const key = Object.keys(body)[0];
  const err = body.err ? body.err : null;
  return { status, data: body[key], err };
};

/**
 * It makes a GET request to the `/api/v1/test` endpoint, and returns the response status and body
 * @returns { status, data }
 */
exports.getAllTest = async (endpoint) => {
  const response = await request(app).get(endpoint).set('skip', true);
  const { status, body: data } = response;
  return { status, data };
};

/**
 * It sends a DELETE request to the `/tests/:id` endpoint, and returns
 * the response body, status code,
 * and error message (if any)
 * @param id - The id of the test you want to delete
 * @returns The data, status, and err are being returned.
 */
exports.deleteOneTest = async (endpoint, id) => {
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
exports.updateOneTest = async (endpoint, id, toUpdate) => {
  const { body, status } = await request(app)
    .put(`${endpoint}/${id}`)
    .send(toUpdate)
    .set('skip', true);

  const key = Object.keys(body)[0];
  const err = body.err ? body.err : null;
  return { status, data: body[key], err };
};
