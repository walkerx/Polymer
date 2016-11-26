'use strict';

var util = require('util');
var Task = require('./task');

// var url = "http://www.huya.com/index.php?m=Game&do=ajaxGameLiveByPage&gid=" + gameId + "&page=" + pageno;
var baseUrl = 'http://www.huya.com/index.php';
var config = {
    name: '虎牙',
    iSiteId: 4,
    baseUrl: baseUrl,
    gamesUrl: baseUrl + 'game',
    roomsUrl: baseUrl + '?m=Game&do=ajaxGameLiveByPage&gid=',
    roomUrl: baseUrl + 'room/' // + roomId
};

var Huya = function () {
    Task.call(this);
    this.config = config;
    this.options.headers['User-Agent'] = '';
};

util.inherits(Huya, Task);

Huya.prototype.parseGames = function (games) {
};

Huya.prototype.getRoomsUrlByGame = function (game) {
    return this.config.roomsUrl + game + '&page=1&pageSize=20';
};

Huya.prototype.parseRooms = function (game) {
    return function (result) {
        if (result.status !== 200 || !(result.data.list instanceof Array)) {
            throw new Error('huya:' + result.message);
        }
        var rooms = [];
        result.data.list.forEach(function (item) {
            var room = {
                iGameId: game.iGameId,
                siteName: config.name,
                iSiteId: config.iSiteId,
                roomId: item.privateHost,
                title: item.roomName,
                pic: item.screenshot,
                online: parseInt(item.totalCount) || 0,
                url: 'http://m.huya.com/' + item.privateHost,
                videoUrl: '',
                anchor: {
                    uid: item.privateHost,
                    nickname: item.nick,
                    avatar: item.avatar180
                },
                updatedAt: new Date()
            };
            rooms.push(room);
        });
        return rooms;
    };
};

Huya.prototype.getRoomUrl = function (roomId) {
    //return this.config.roomUrl + roomId;
};

Huya.prototype.parseRoom = function (room) {
};

module.exports = new Huya();
