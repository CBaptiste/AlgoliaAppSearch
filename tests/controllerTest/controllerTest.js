var assert = require('assert'),
    http = require('http');

describe('/', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
   });

  it('should return 404 if something else', function (done) {
    http.get('http://localhost:3000/toto', function (res) {
      assert.equal(404, res.statusCode);
      done();
    });
  });
});