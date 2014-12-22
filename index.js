var getDrivers = require('get-driver-scripts');
var q = require('q');
var getTreeAsList = require('dependency-tree').getTreeAsList;

/**
 * Get the number of modules used in your codebase
 *
 * @param  {Object} options - Passthrough to get-driver-scripts
 * @param  {String} options.directory
 * @param  {Function} options.success - Resolved with number of used modules in the directory
 */
module.exports = function(options) {
  options = options || {};

  if (!options.directory) { throw new Error('directory not given'); }
  if (!options.success) { throw new Error('success callback not given'); }

  // Our success callback shouldn't be getDrivers' success callback
  var success = options.success;

  options.success = function(err, drivers) {
    getTrees({
      drivers: drivers,
      directory: options.directory
    })
    .then(convertTreesToLUT)
    .done(function(treeLUT) {
      success(null, Object.keys(treeLUT).length);
    });
  };

  getDrivers(options);
};

/**
 * Generates a lookup table of the unique strings within the given lists
 *
 * @param  {Array<Array<String>>} treesList
 * @return {Object}
 */
function convertTreesToLUT(treesList) {
  var LUT = {};

  treesList.forEach(function(list) {
    list.forEach(function(module) {
      LUT[module] = true;
    });
  });

  return LUT;
}

/**
 * Gets the dependency tree for each of the given files
 * @param  {Object}     options
 * @param  {String[]}   options.drivers
 * @param  {String}     options.directory
 * @return {Promise}    (String[]) => null Resolves with a list of trees for each file in the list
 */
function getTrees(options) {
  var cache = {};

  return q.all(options.drivers.map(function(driver) {
    var deferred = q.defer();

    var success = function(tree) {
      deferred.resolve(tree);
    };

    getTreeAsList(driver, options.directory, success, cache);

    return deferred.promise;
  }));
}