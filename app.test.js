const request = require('supertest');
const http = require('http');

// This mimics your server to see if it responds
const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Hello World');
});

describe('GET /', () => {
  it('should respond with status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});