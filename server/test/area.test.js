const { expect } = require('chai');
const request = require('request');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`;
let token;

describe('areas endpoint', () => {
  beforeEach(() => {
    // const url = `${URL}/signup`;
    // const headers = { Accept: 'application/json' };
    // const body = { email: 'test@gmail.com', password: '123456' };
    // const method = 'POST';
    // const options = { url, headers, body, method };
    // const fallback = (error, response, body) => {
    //   if (!error && response.status === 200) {
    //     token = response;
    //   }
    // };
    // const response = request(options, fallback);
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
