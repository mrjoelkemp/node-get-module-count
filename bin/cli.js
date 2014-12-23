#!/usr/bin/env node

'use strict';

var getCount = require('../');
var directory = process.argv[2];

getCount({
  directory: directory,
  success: function(err, count) {
    console.log(count);
  }
});