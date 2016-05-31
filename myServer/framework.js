/**
 * Created by alexp on 30.05.16.
 */
var http = require('http'),
    logger = require('./tools/logger'),
    cookiesParser = require('./tools/cookiesParser'),
    router = require('./tools/router'),
    cacher = require('./tools/cacher'),
    port = require('./tools/port'),
    fs = require('fs'),
    vm = require('vm');



var context = {
    http : http,
    logger : logger,
    cookiesParser : cookiesParser,
    router : router,
    cacher : cacher,
    port : port
};

context.global = context;
var sandbox = vm.createContext(context);

var fileName = './goodServer.js';
fs.readFile(fileName, function(err, src) {
    if(!err) {
        logger.logString("Server was launched");
        port.port = parseInt(process.argv[2]);
        var script = vm.createScript(src, fileName);
        script.runInNewContext(sandbox);
    } else {
        console.log("Wrong file");
    }
});