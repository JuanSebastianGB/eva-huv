/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-test-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable jest/no-hooks */

const chai = require('chai');
const request = require('request');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;

let headers;
let method;

describe('test suit for areas endpoint', () => {
  beforeEach(() => {
    headers = {
      Accept: 'application/json',
      skip: true,
    };
    method = 'GET';
  });

  it('get /areas must return status code 200', (done) => {
    const url = `${URL}/areas`;
    const options = { url, method, headers };
    request(options, (err, res, body) => {
      chai.expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('get /areas must return a list', (done) => {
    const url = `${URL}/areas`;
    const options = { url, method, headers };
    request(options, (err, res, body) => {
      const jsonObject = JSON.parse(body);
      chai.expect(Array.isArray(jsonObject)).to.equal(true);
      done();
    });
  });
  it('get /areas/:id must return a json object with "area" key and an object value', (done) => {
    const url = `${URL}/areas/1`;
    const options = { url, method, headers };
    request(options, (err, res, body) => {
      const jsonObject = JSON.parse(body);
      chai.expect(Object.keys(jsonObject).includes('area')).to.equal(true);
      chai.expect(typeof jsonObject.area).to.equal('object');
      done();
    });
  });
  it('get /areas/:id should return an error if id is not valid', (done) => {
    const url = `${URL}/areas/hello`;
    const options = { url, method, headers };
    request(options, (err, res, body) => {
      const jsonObject = JSON.parse(body);
      chai.expect(typeof jsonObject).to.equal('object');
      chai.expect(Object.keys(jsonObject).length).to.equal(1);
      chai.expect(jsonObject.err).to.equal('id must be a number');
      done();
    });
  });
  it('get /areas/:id most give an empty object when id is not found', (done) => {
    const url = `${URL}/areas/99999999999999`;
    const options = { url, method, headers };
    request(options, (err, res, body) => {
      const jsonObject = JSON.parse(body);
      chai.expect(Object.entries(jsonObject).length).to.equal(0);
      done();
    });
  });
});
