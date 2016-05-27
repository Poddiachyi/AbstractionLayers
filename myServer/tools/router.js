/**
 * Created by alexp on 27.05.16.
 */
var personRouter = require('../person/router.person');

module.exports.routing = {
    '/': function (req, res, cookies) {
        if (req.method === 'GET') {
            res.writeHead(200, {
                'Set-Cookie': 'mycookie=test',
                'Content-Type': 'text/html'
            });
            var ip = req.connection.remoteAddress;
            res.write('<h1>Welcome</h1>Your IP: ' + ip);
            res.end('<pre>' + JSON.stringify(cookies) + '</pre>');
        }
    },
    '/person': function (req, res) {
        if (req.method === 'GET') personRouter.get(req, res);
        if (req.method === 'POST') personRouter.post(req, res);
    }
};