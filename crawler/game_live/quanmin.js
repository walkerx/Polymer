'use strict';

var Task = require('./task');
var util = require('util');
var baseUrl = 'http://www.quanmin.tv/json/';
var config = {
    name: '全民',
    iSiteId: 6,
    baseUrl: baseUrl,
    gamesUrl: baseUrl + 'game.lists/20-1.json',
    roomsUrl: baseUrl + 'categories/',
    roomUrl: baseUrl + 'room/' // + roomId
};

var QuanMin = function () {
    Task.call(this);
    this.config = config;
};

util.inherits(QuanMin, Task);

QuanMin.prototype.parseGames = function (games) {

};

QuanMin.prototype.getRoomsUrlByGame = function (game) {
    return this.config.roomsUrl + game + '/list.json';
};

QuanMin.prototype.parseRooms = function (game) {
    return function (result) {
        if (!(result.data instanceof Array)) {
            throw new Error('quanmin: 返回数据格式错误');
        }
        var rooms = [];
        result.data.forEach(function (item) {
            var room = {
                iGameId: game.iGameId,
                siteName: config.name,
                iSiteId: config.iSiteId,
                roomId: item.uid,
                title: item.title,
                pic: item.thumb,
                online: parseInt(item.view) || 0,
                url: 'http://m.quanmin.tv/v/' + item.uid,
                videoUrl: 'http://hls.quanmin.tv/live/' + item.uid + '/playlist.m3u8',
                anchor: {
                    uid: item.uid,
                    nickname: item.nick,
                    avatar: item.avatar
                },
                updatedAt: new Date()
            };
            rooms.push(room);
        });
        return rooms;
    };
};

QuanMin.prototype.getRoomUrl = function (roomId) {
};

QuanMin.prototype.parseRoom = function (room) {
};

module.exports = new QuanMin();
