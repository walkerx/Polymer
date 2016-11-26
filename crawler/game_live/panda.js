'use strict';

var util = require('util');
var Task = require('./task');

var baseUrl = 'http://api.m.panda.tv/';
var config = {
    name: '熊猫',
    iSiteId: 5,
    baseUrl: baseUrl,
    gamesUrl: baseUrl + 'game',
    roomsUrl: baseUrl + 'ajax_get_live_list_by_cate?__plat=h5', // + cate + '?offset=0&limit=100'
    roomUrl: baseUrl + 'room/' // + roomId
};

var Panda = function () {
    Task.call(this);
    this.config = config;
};

util.inherits(Panda, Task);

Panda.prototype.parseGames = function (games) {
};

Panda.prototype.getRoomsUrlByGame = function (game) {
    return this.config.roomsUrl + '&cate=' + game + '&pageno=1&pagenum=20';
};

Panda.prototype.parseRooms = function (game) {
    return function (result) {
        if (result.errno !== 0 || !(result.data.items instanceof Array)) {
            throw new Error('panda:' + result.errmsg);
        }
        var rooms = [];
        result.data.items.forEach(function (item) {
            var room = {
                iGameId: game.iGameId,
                siteName: config.name,
                iSiteId: config.iSiteId,
                roomId: item.id,
                title: item.name,
                pic: item.pictures.img,
                online: parseInt(item.person_num) || 0,
                url: 'http://m.panda.tv/room.html?roomid=' + item.id,
                videoUrl: item.room_key,  //video key
                anchor: {
                    uid: item.userinfo.rid,
                    nickname: item.userinfo.nickName,
                    avatar: item.userinfo.avatar
                },
                updatedAt: new Date()
            };
            rooms.push(room);
        });
        return rooms;
    };
};


Panda.prototype.getRoomUrl = function (roomId) {
};


Panda.prototype.parseRoom = function (room) {
};

module.exports = new Panda();
