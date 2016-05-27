/**
 * Created by alexp on 27.05.16.
 */

module.exports.parseCookies = function (req) {
    var cookie = req.headers.cookie;
    var cookies = {};
    if (cookie) cookie.split(';').forEach(function(item) {
        var parts = item.split('=');
        cookies[(parts[0]).trim()] = (parts[1] || '').trim();
    });
    return cookies;
}
