var assert = require('assert');
var getModuleCount = require('../');

describe('get-module-count', function() {
  it('gets the total number of used modules', function(done) {
      getModuleCount({
        directory: __dirname + '/example',
        success: function(err, count) {
          assert(!err);
          assert(count);
          assert(typeof count === 'number');
          done();
        }
      });
  });
});