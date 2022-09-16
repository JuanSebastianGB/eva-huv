const { expect } = require('chai');
const request = require('request');
require('dotenv').config();

const PORT = process.env.PORT || 5000,
  URL = `http://localhost:${PORT}`;

describe('areas endpoint', () => {
  it('Post /signup', (done) => {
    const url = `${URL}/signup`,
      email = process.env.TEST_EMAIL,
      password = process.env.TEST_PASSWORD,
      method = 'POST',
      form = { email, password: '123456' },
      headers = { Accept: 'application/json' },
      options = { url, method, form, headers };
    request.post(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      jsonResponse = JSON.parse(body);
      const { token } = jsonResponse;
      expect(token).to.be.a('string');
      done();
    });
  });
});
