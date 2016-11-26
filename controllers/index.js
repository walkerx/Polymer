'use strict';

var Mongo = require(appRoot + '/models');

/**
 * 获取各个平台的信息
 */
var getSites = function (req, res) {
    Mongo.Site.find().select('-_id').lean()
        .exec(function (err, sites) {
            if (err) {
                return res.json({result: 2, err: err});
            }
            return res.json({result: 1, data: sites});
        });
};

/**
 * 获取游戏列表
 */
var getGames = function (req, res) {
    Mongo.Game.find().select('-_id').lean()
        .exec(function (err, games) {
            if (err) {
                return res.json({result: 2, err: err});
            }
            return res.json({result: 1, data: games});
        });
};

/**
 * 获取游戏直播间
 */
var getRooms = function (req, res) {
    req.checkQuery('size', '参数格式有误').notEmpty().isPositive();
    req.checkQuery('offset', '参数格式有误').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.json({result: 2, err: errors[0].msg});
    }
    var offset = parseInt(req.query.offset);
    var size = parseInt(req.query.size);
    var condition = {};
    if (req.query.iGameId) {
        condition.iGameId = req.query.iGameId;
    }
    Mongo.Live.find({iGameId: req.query.iGameId}).sort({online: -1})
        .lean().skip(offset).limit(size).exec(function (err, rooms) {
        if (err) {
            return res.json({result: 2, err: err});
        }
        return res.json({result: 1, data: rooms});
    });
};

module.exports = function (router) {
    router.get('/sites', getSites);
    router.get('/games', getGames);
    router.get('/rooms', getRooms);
    router.get('/test', function (req, res) {
        return res.json({result: 1});
    });
    // router.get('/search', search);
    // router.get('/info', getInfo);
    // router.get('/refresh', refreshRoom);
};


