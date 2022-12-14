const request = require('supertest');
const app = require('../server');

/* Truncating the models. */
exports.truncateModels = async (models) => {
  models.map((model) => model.destroy({ where: {}, force: true }));
};

/* Making a POST request to the endpoint and returning the status code and the data returned by the
endpoint. */
exports.createOneRow = async (endpoint, toCreate) => {
  const { status, body } = await request(app)
    .post(endpoint)
    .send(toCreate)
    .set('skip', true);
  const { response: data, err } = body;
  return { status, data, err };
};

/* Making a GET request to the endpoint and returning the status code and the data returned by the
endpoint. */
exports.getOneRow = async (endpoint, id) => {
  const response = await request(app)
    .get(`${endpoint}/${id}`)
    .set('skip', true);
  const { status, body } = response;
  const { response: data, err } = body;
  return { status, data, err };
};

/* Making a GET request to the endpoint and returning the status code and the data returned by the
endpoint. */
exports.getAllRow = async (endpoint) => {
  const response = await request(app).get(endpoint).set('skip', true);
  const { status, body } = response;
  const { response: data, err } = body;

  return { status, data, err };
};

/* Deleting a row in the database. */
exports.deleteOneRow = async (endpoint, id) => {
  const { body, status } = await request(app)
    .delete(`${endpoint}/${id}`)
    .set('skip', true);
  const { response: data, err } = body;
  return { data, status, err };
};

/* Updating a row in the database. */
exports.updateOneRow = async (endpoint, id, toUpdate) => {
  const { body, status } = await request(app)
    .put(`${endpoint}/${id}`)
    .send(toUpdate)
    .set('skip', true);

  const { response: data, err } = body;
  return { status, data, err };
};
