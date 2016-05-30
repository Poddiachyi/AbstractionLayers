/**
 * Created by alexp on 30.05.16.
 */
var http = require('http'),
    logger = require('./tools/logger'),
    cookiesParser = require('./tools/cookiesParser'),
    router = require('./tools/router'),
    cacher = require('./tools/cacher'),
    fs = require('fs'),
    vm = require('vm');

var context = {
    http : http,
    logger : logger,
    cookiesParser : cookiesParser,
    router : router,
    cacher : cacher
};

context.global = context;
var sandbox = vm.createContext(context);

var fileName = './goodServer.js';
fs.readFile(fileName, function(err, src) {
    if(!err) {
        console.log("Server was launched");
        var script = vm.createScript(src, fileName);
        script.runInNewContext(sandbox);
    } else {
        console.log("Wrong file");
    }
});