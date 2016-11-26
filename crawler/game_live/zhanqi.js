'use strict';

var Task = require('./task');
var util = require('util');

//http://m.zhanqi.tv/api/static/game.lives/9/20-1.json
//"http://m.zhanqi.tv/api/static/live.domain/" + roomId + ".json";
//String videoId = jsonObject.get("data").getAsJsonObject().get("videoId").getAsString();
//return "http://dlhls.cdn.zhanqi.tv/zqlive/" + videoId + ".m3u8";
var baseUrl = 'http://m.zhanqi.tv/api/static/';
var config = {
    name: '战旗',
    iSiteId: 2,
    baseUrl: baseUrl,
    gamesUrl: baseUrl + 'game.lists/20-1.json',
    roomsUrl: baseUrl + 'game.lives/', // + cate + '/' + size + '-' + page + '.json';
    roomUrl: baseUrl + 'room/' // + roomId
};

var ZhanQi = function () {
    Task.call(this);
    this.config = config;
};

util.inherits(ZhanQi, Task);

ZhanQi.prototype.parseGames = function (games) {

};

ZhanQi.prototype.getRoomsUrlByGame = function (game) {
    return this.config.roomsUrl + game + '/20-1.json';
};

ZhanQi.prototype.parseRooms = function(game){
    return function (result) {
        if (result.code !== 0) {
            throw new Error('zhanqi:' + result.message);
        }
        var rooms = [];
        result.data.rooms.forEach(function (item) {
            var room = {
                iGameId: game.iGameId,
                siteName: config.name,
                iSiteId: config.iSiteId,
                roomId: item.code,
                title: item.title,
                pic: item.bpic,
                online: parseInt(item.online) || 0,
                url: item.url,
                videoUrl: "http://m.zhanqi.tv/api/static/live.domain/" + item.videoId + ".json",
                anchor: {
                    uid: item.uid,
                    nickname: item.nickname,
                    avatar: item.avatar
                },
                updatedAt: new Date()
            };
            rooms.push(room);
        });
        return rooms;
    };
};


ZhanQi.prototype.getRoomUrl = function (roomId) {
    return this.config.roomUrl + roomId;
};


ZhanQi.prototype.parseRoom = function (room) {
};

module.exports = new ZhanQi();
