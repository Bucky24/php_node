const entryPoint = process.argv[2];
const path = require('path');

const entryDir = path.dirname(entryPoint);

process.chdir(entryDir);

'use strict';

const Module = require('module');
const originalLoader = Module._load;

function express() {
    return {
        post: () => {},
        get: () => {},
        delete: () => {},
        use: () => {},
        listen: () => {},
    }
}

express.json = () => {};
express.static = () => {};

express.Router = function() {
    return express();
}

const mockExports = {
    express,
};

Module._load = function(request, parent) {
  return mockExports.hasOwnProperty(request)
    ? mockExports[request]
    : originalLoader.apply(this, arguments);
};

require(entryPoint);