const { expect } = require('chai');
const request = require('request');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;

let headers;
let method;

describe('Test suit for areas endpoint', () => {
  beforeEach(() => {
    headers = {
      Accept: 'application/json',
      skip: true,
    };
    method = 'GET';
  });

  it('Get /areas must return status code 200', (done) => {
    const url = `${URL}/areas`,
      options = { url, method, headers };
    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('Get /areas must return a list', (done) => {
    const url = `${URL}/areas`,
      options = { url, method, headers };
    request(options, (err, res, body) => {
      const jsonObject = JSON.parse(body);
      expect(Array.isArray(jsonObject)).to.equal(true);
      done();
    });
  });
  it('Get /areas/:id must return a json object with "area" key and an object value', (done) => {
    const url = `${URL}/areas/1`,
      options = { url, method, headers };
    request(options, (err, res, body) => {
      const jsonObject = JSON.parse(body);
      expect(Object.keys(jsonObject).includes('area')).to.equal(true);
      expect(typeof jsonObject['area']).to.equal('object');
      done();
    });
  });
  it('Get /areas/:id should return an error if id is not valid', (done) => {
    const url = `${URL}/areas/hello`,
      options = { url, method, headers };
    request(options, (err, res, body) => {
      const jsonObject = JSON.parse(body);
      expect(typeof jsonObject).to.equal('object');
      expect(Object.keys(jsonObject).length).to.equal(1);
      expect(jsonObject['err']).to.equal('id must be a number');
      done();
    });
  });
  it('Get /areas/:id most give an empty object when id is not found', (done) => {
    const url = `${URL}/areas/99999999999999`,
      options = { url, method, headers };
    request(options, (err, res, body) => {
      const jsonObject = JSON.parse(body);
      expect(Object.entries(jsonObject).length).to.equal(0);
      done();
    });
  });
});
