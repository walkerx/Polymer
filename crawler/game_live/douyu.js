'use strict';

var util = require('util');
var Task = require('./task');

var baseUrl = 'http://open.douyucdn.cn/api/RoomApi/';
//https://m.douyu.com/html5/live?roomId=514974
//response.getAsJsonObject("data").get("hls_url").getAsString();
var config = {
    name: '斗鱼',
    iSiteId: 1,
    baseUrl: baseUrl,
    gamesUrl: baseUrl + 'game',
    roomsUrl: baseUrl + 'live/', // + cate + '?offset=0&limit=100'
    roomUrl: baseUrl + 'room/' // + roomId
};

var DouYu = function () {
    Task.call(this);
    this.config = config;
};

util.inherits(DouYu, Task);

DouYu.prototype.parseGames = function (games) {
};

DouYu.prototype.getRoomsUrlByGame = function (game) {
    return this.config.roomsUrl + game + '?offset=0&limit=20';
};

DouYu.prototype.parseRooms = function (game) {
    return function (result) {
        if (result.error !== 0 || !(result.data instanceof Array)) {
            throw new Error('douyu:' + result.error);
        }
        var rooms = [];
        result.data.forEach(function (item) {
            var room = {
                iGameId: game.iGameId,
                siteName: config.name,
                iSiteId: config.iSiteId,
                roomId: item.room_id,
                title: item.room_name,
                pic: item.room_src,
                online: parseInt(item.online) || 0,
                url: item.url,
                videoUrl: '',
                anchor: {
                    uid: item.owner_uid,
                    nickname: item.nickname,
                    avatar: item.avatar
                },
                updatedAt: new Date()
            };
            rooms.push(room);
        });
        return rooms;
    }
};

DouYu.prototype.getRoomUrl = function (roomId) {
    return this.config.roomUrl + roomId;
};


DouYu.prototype.parseRoom = function (room) {
};

module.exports = new DouYu();
