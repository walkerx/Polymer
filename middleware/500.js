'use strict';
module.exports = function (template) {
    return function serverError(err, req, res, next) {
        var model = {url: req.url, err: err, statusCode: 500};
        if (res.finished) {
            console.error('url:' + req.url + '  error:' + err);
        } else {
            res.status(500);
            res.json({error: 500});
        }
    };
};
