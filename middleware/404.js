'use strict';

module.exports = function (template) {
    return function fileNotFound(req, res, next) {
        var model = {url: req.url, statusCode: 404};
        res.status(404);
        res.json({result: 404});
    };
};
