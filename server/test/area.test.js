const { expect } = require('chai');
const request = require('request');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;
let token;

describe('areas endpoint', () => {
  beforeEach(() => {
    const url = `${URL}/areas`,
      email = process.env.TEST_EMAIL,
      password = process.env.TEST_PASSWORD,
      method = 'POST',
      form = { email, password },
      headers = { Accept: 'application/json' },
      options = { url, method, form, headers };
    request.post(options, (err, res, body) => {
      jsonResponse = JSON.parse(body);
      token = jsonResponse.token;
    });
  });
  it('Get /areas', (done) => {
    const url = `${URL}/areas`;
    // const headers = { 'x-access-token': token };

    const options = {
      url,
      // headers,
    };
    request(url, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
