#### get-module-count [![npm](http://img.shields.io/npm/v/get-module-count.svg)](https://npmjs.org/package/get-module-count) [![npm](http://img.shields.io/npm/dm/get-module-count.svg)](https://npmjs.org/package/get-module-count)

> Get the number of used modules within a directory

`npm install get-module-count`

*Works for AMD, CommonJS, and ES6 codebases.*

### Usage

```js
var getModuleCount = require('get-module-count');

getModuleCount({
  directory: 'path/to/my/js',
  success: function(err, count) {

  }
});
```

* You may pass additional options supported by [`get-driver-scripts`](https://github.com/mrjoelkemp/node-get-driver-scripts)
to handle pulling driver scripts from a RequireJS build config or resolving aliased
paths via a requirejs config.


### How it works

This module works by getting the driver script (i.e., entry points) from the
given directory. For each driver script, it will generate the memoized dependency tree
for that script and then sum the number of unique modules across all the trees.

