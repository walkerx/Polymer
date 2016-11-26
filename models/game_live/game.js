'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    iGameId: {type: Number}, //本地ID
    name: {type: String},    // 游戏中文名
    eName: {type: String}   // 游戏英文名
}, { autoIndex: false});

mongoose.model('Game', GameSchema);
