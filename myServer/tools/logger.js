/**
 * Created by alexp on 27.05.16.
 */

module.exports.log = function (req) {
    var date = new Date().toISOString();
    console.log([date, req.method, req.url].join('  '));
}
module.exports.logString = function (string) {
    console.log(string);
}
