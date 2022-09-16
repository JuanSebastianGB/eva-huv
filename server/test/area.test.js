const { expect } = require('chai');
const request = require('request');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;
let token;

const getToken = async (done) => {
  const url = `${URL}/signup`,
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
};

describe('Test suit for areas endpoint', () => {
  beforeEach(() => {
    // const url = `${URL}/signup`,
    //   email = process.env.TEST_EMAIL,
    //   password = process.env.TEST_PASSWORD,
    //   method = 'POST',
    //   form = { email, password },
    //   headers = { Accept: 'application/json' },
    //   options = { url, method, form, headers };
    // const response = request.post(options, (err, res, body) => {
    //   console.log(body);
    // });
  });

  it('Get /areas', async (done) => {
    console.log({ token });
    const url = `${URL}/areas`,
      headers = { Accept: 'application/json', 'x-access-token': token },
      method = 'GET',
      options = { url, method, headers };
    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('Get /areas must have a header x-access-token to get the token', (done) => {
    const url = `${URL}/areas`,
      headers = { Accept: 'application/json', 'x-access-token': token },
      method = 'GET',
      options = { url, method };
    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
