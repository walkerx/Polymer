'use strict';
//var request = require('request');
var request = require('request-promise');
var db = require('../../models');

var Task = function () {
    this.config = {};
    this.options = {
        timeout: 20000,
        json: true,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        }
    }
};

Task.prototype.getRoomsByGame = function (game, callback) {
    var self = this;
    if (self.getRoomsUrlByGame && self.parseRooms) {
        self.options.url = self.getRoomsUrlByGame(game.code);
        request(self.options)
            .then(self.parseRooms(game))
            .then(self.updateRooms)
            .catch(function(err){
                console.error('错误:' + game.iGameId);
                console.error('错误:' + self.config.name);
                console.error('错误:' + err);
            })
            .finally(callback);
    } else {
        console.log('getRoomsByGame: getRoomsUrl is null');
        callback('getRoomsUrl is null');
    }
};


Task.prototype.updateRooms =function(rooms){
    if (rooms.length === 0) {
        return;
    }
    var bulk1 = db.Live.collection.initializeUnorderedBulkOp();
    rooms.forEach(function (room) {
        bulk1.find({roomId: room.roomId, iSiteId: room.iSiteId}).upsert()
            .updateOne(room);
    });
    bulk1.execute(function (err) {
        if (err) {
            console.error(err);
        }
    });

    var bulk = db.Room.collection.initializeUnorderedBulkOp();
    rooms.forEach(function (room) {
        bulk.find({roomId: room.roomId, iSiteId: room.iSiteId}).upsert()
            .updateOne({$setOnInsert: room});
    });
    bulk.execute(function (err) {
        if (err) {
            console.error(err);
        }
    });
};




Task.prototype.getGames = function () {
    var self = this;
    if (self.config.gamesUrl && self.parseGames) {
        self.options.url = self.config.gamesUrl;
        request(self.options, function (error, response, body) {
            self.callback(error, response, body, self.parseGames);
        });
    } else {
        console.log('getGames: gamesUrl is null');
    }
};

// Task.prototype.getRoom = function (roomId) {
//     var self = this;
//     if (self.getRoomUrl && self.parseRoom) {
//         self.options.url = self.getRoomUrl(roomId);
//         request(self.options, function (error, response, body) {
//             self.callback(error, response, body, self.parseRoom);
//         });
//     } else {
//         console.log('getRoom: getRoomUrl is null');
//     }
// };

module.exports = Task;
