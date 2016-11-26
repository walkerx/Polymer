'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnchorSchema = new Schema({
    uid: {type: String},        // 主播平台uid
    nickname: {type: String},   // 主播昵称
    gender: {type: Number},     // 主播性别
    avatar: {type: String}      // 主播头像
}, {autoIndex: false});

mongoose.model('Anchor', AnchorSchema);
