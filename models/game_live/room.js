'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 直播间基本信息
 */
var RoomSchema = new Schema({
    iSiteId: {type: Number, ref: 'Site'},
    iGameId: {type: Number, ref: 'Game'},
    //anchor: {type: Schema.ObjectId, ref: 'Anchor'},
    gameName: {type: String},     // 所属游戏名
    siteName: {type: String},     // 所属平台
    roomId: {type: String},       // 直播间Id
   // title: {type: String},        // 直播间标题
   // pic: {type: String},          // 直播间封面图
   // online: {type: Number},       // 在线人数
    url: {type: String},          // 直播间url
    videoUrl: {type: String},    // 直播源url
    anchor: {                       // 主播信息
        // _id: {type: Schema.ObjectId, ref: 'Anchor'},
        uid: {type: String},        // 主播uid
        nickname: {type: String},   // 主播昵称
        gender: {type: Number},     // 主播性别
        avatar: {type: String}      // 主播头像
    },
    updatedAt: {type: Date, default: Date.now}  // 更新时间
}, {autoIndex: false});

RoomSchema.index({ iSiteId: 1, roomId: 1 }, {unique: true});

mongoose.model('Room', RoomSchema);
