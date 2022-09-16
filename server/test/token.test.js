const { expect } = require('chai');
const request = require('request');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;
let token;

describe('areas endpoint', () => {
  it('Post /signup', (done) => {
    const url = `${URL}/signup`;
    const method = 'POST',
      form = { email: 'test@gmail.com', password: '123456' },
      headers = { Accept: 'application/json' },
      options = { url, method, form, headers };
    request.post(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
