'use strict';
var db = require('../models');
var data = require('../crawler/game_live/config.json');

var init = function () {
    db.Game.count({}, function (err, count) {
        if (err) {
            console.log(err, count);
        }
        if (count < 1) {
            db.Game.insertMany(data.games, function (error, docs) {
                if (error) {
                    console.log(err);
                }
            });
            db.Site.insertMany(data.sites, function (error, docs) {
                if (error) {
                    console.log(err);
                }
            });
        }
    });
};


module.exports = init;
