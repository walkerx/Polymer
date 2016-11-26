'use strict';

var util = require('util');
var Task = require('./task');

var baseUrl = 'http://api.plu.cn/tga/streams';
var config = {
    name: '龙珠',
    iSiteId: 3,
    baseUrl: baseUrl,
    gamesUrl: baseUrl + 'game'
};

var LongZhu = function () {
    Task.call(this);
    this.config = config;
};

util.inherits(LongZhu, Task);

LongZhu.prototype.parseGames = function (games) {
};

LongZhu.prototype.getRoomsUrlByGame = function (game) {
    return this.config.baseUrl + '?max-results=20&start-index=0&sort-by=top&filter=0&game=' + game;
};

LongZhu.prototype.parseRooms = function (game) {
    return function (result) {
        if (!result.data || !(result.data.items instanceof Array)) {
            throw new Error('longzhu:' + result.error);
        }
        var rooms = [];
        result.data.items.forEach(function (item) {
            var room = {
                iGameId: game.iGameId,
                siteName: config.name,
                iSiteId: config.iSiteId,
                roomId:  item.channel.id,
                title: item.channel.status,
                pic: item.preview,
                online: parseInt(item.viewers) || 0,
                url: item.channel.h5,
                videoUrl: '',
                anchor: {
                    uid: item.channel.domain,
                    nickname: item.channel.name,
                    avatar: item.channel.avatar
                },
                updatedAt: new Date()
            };
            rooms.push(room);
        });
        return rooms;
    };
};


LongZhu.prototype.getRoomUrl = function (roomId) {
};


LongZhu.prototype.parseRoom = function (room) {
};

module.exports = new LongZhu();
