const { expect } = require('chai');
const request = require('request');
require('dotenv').config();
const { v4 } = require('uuid');

const PORT = process.env.PORT || 5000,
  URL = `http://localhost:${PORT}`;

describe('areas endpoint', () => {
  it('Post /signup', (done) => {
    const url = `${URL}/signup`,
      email = process.env.TEST_EMAIL,
      password = process.env.TEST_PASSWORD,
      method = 'POST',
      form = { email, password },
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

  it('Post /signup should thrown an error when email is missing', (done) => {
    const url = `${URL}/signup`,
      password = process.env.TEST_PASSWORD,
      method = 'POST',
      form = { password },
      headers = { Accept: 'application/json' },
      options = { url, method, form, headers };
    request.post(options, (err, res, body) => {
      expect(res.statusCode).to.equal(400);
      const jsonResponse = JSON.parse(body);
      expect(jsonResponse.err).to.equal('Missing Email');
      done();
    });
  });
  it('Post /signup should thrown an error when email is not in the database', (done) => {
    const url = `${URL}/signup`,
      email = v4(),
      password = process.env.TEST_PASSWORD,
      method = 'POST',
      form = { email, password },
      headers = { Accept: 'application/json' },
      options = { url, method, form, headers };
    request.post(options, (err, res, body) => {
      expect(res.statusCode).to.equal(401);
      const jsonResponse = JSON.parse(body);
      expect(jsonResponse.err).to.equal('Not valid credentials');
      done();
    });
  });
  it("Post /signup should thrown an error when the email exists but password doesn't match", (done) => {
    const url = `${URL}/signup`,
      email = process.env.TEST_EMAIL,
      password = v4(),
      method = 'POST',
      form = { email, password },
      headers = { Accept: 'application/json' },
      options = { url, method, form, headers };
    request.post(options, (error, res, body) => {
      expect(res.statusCode).to.equal(401);
      const jsonResponse = JSON.parse(body);
      expect(jsonResponse.error).to.equal('Not valid credentials');
      done();
    });
  });
});
