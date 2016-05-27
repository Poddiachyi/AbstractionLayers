/**
 * Created by alexp on 27.05.16.
 */

var fs = require('fs');
var cacher = require('../tools/cacher');

module.exports.get = function (req, res) {
    fs.readFile('./person/person.json', function(err, data) {
        if (!err) {
            var obj = JSON.parse(data);
            obj.birth = new Date(obj.birth);
            var difference = new Date() - obj.birth;
            obj.age = Math.floor(difference / 31536000000);
            delete obj.birth;
            var data = JSON.stringify(obj);
            cacher.cache[req.url] = data;

            // HTTP reply
            res.writeHead(200);
            res.end(data);
        } else {
            res.writeHead(500);
            res.end('Read error');
        }
    });
};

module.exports.post = function (req, res) {
    var body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        var data = Buffer.concat(body).toString();
        var obj = JSON.parse(data);
        if (obj.name) obj.name = obj.name.trim();
        data = JSON.stringify(obj);
        cacher.cache[req.url] = data;
        fs.writeFile('./person/person.json', data, function(err) {
            if (!err) {
                res.writeHead(200);
                res.end('File saved');
            } else {
                res.writeHead(500);
                res.end('Write error');
            }
        });
    });
}