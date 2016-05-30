http.createServer(function (req, res) {
    var cookies = cookiesParser.parseCookies(req);
    logger.log(req);
    if (cacher.cache[req.url] && req.method === 'GET') {
        console.log('Getting from cache');
        res.writeHead(200);
        res.end(cacher.cache[req.url]);
    } else {
        if (router.routing[req.url]) router.routing[req.url](req, res, cookies);
        else {
            res.writeHead(404);
            res.end('Path not found');
        }
    }
}).listen(8080);

