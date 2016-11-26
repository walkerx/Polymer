'use strict';
var util = require('util');
var Task = require('./task');

var baseUrl = 'https://api.twitch.tv/kraken/';
var config = {
    name: 'twitch',
    iSiteId: 7,
    games: baseUrl + 'games/top',
    user: baseUrl + 'user',
    channel: baseUrl + 'channel',
    search: baseUrl + 'search',
    streams: baseUrl + 'streams',
    ingests: baseUrl + 'ingests',
    teams: baseUrl + 'teams'
};
var Twitch = function () {
    Task.call(this);
    this.config = config;
    this.options.headers['Accept'] = 'application/vnd.twitchtv.v3+json';
    this.options.headers['Content-Type'] = 'application/json';
    this.options.headers['Client-ID'] = '7id9mb4u5cm0s4kn7fqgi3nu0ztxz41'
};

util.inherits(Twitch, Task);

Twitch.prototype.parseGames = function(games) {
};

Twitch.prototype.getRoomsUrlByGame = function(game) {
    return this.config.streams + '?offset=0&limit=20&game=' + game ;
};

Twitch.prototype.parseRooms = function(game) {
    return function (result) {
        if (!(result.streams instanceof Array)) {
            throw new Error('twitch:' + result.error + ':' + result.message);
        }
        var rooms = [];
        result.streams.forEach(function (item) {
            var room = {
                iGameId: game.iGameId,
                siteName: config.name,
                iSiteId: config.iSiteId,
                roomId:  item.channel.name,
                title: item.channel.status,
                pic: item.preview.medium,
                online: parseInt(item.viewers) || 0,
                url: item.channel.url,
                videoUrl: '',
                anchor: {
                    uid: item.channel.id,
                    nickname: item.channel.display_name,
                    avatar: item.channel.logo
                },
                updatedAt: new Date()
            };
            rooms.push(room);
        });
        return rooms;
    };
};



module.exports = new Twitch();
