'use strict';
var mongoose = require('mongoose');

require('./game_live/room');
require('./game_live/site');
require('./game_live/anchor');
require('./game_live/game');
require('./game_live/live');
require('./raw');
exports.Raw = mongoose.model('Raw');

exports.Room = mongoose.model('Room');
exports.Site = mongoose.model('Site');
exports.Anchor = mongoose.model('Anchor');
exports.Game = mongoose.model('Game');
exports.Live = mongoose.model('Live');
