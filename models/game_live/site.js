'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
    iSiteId: {type: Number},
    eName: {type: String},
    name: {type: String},    // 网站名称
    url: {type: String},     // 网站首页
    games:[
        {
            _id: false,
            iGameId: {type: Number, ref: 'Game'},
            code: {type: String},             // 该直播平台的游戏分类id
            name: {type: String},             // 游戏名称
            eName: {type: String},            // 游戏英文
            short: {type: String},            // 平台自己的游戏简称
            url: {type: String},              // 该网站的游戏url
            cover: {type: String},            // 该网站的游戏封面图片
            icon: {type: String}              // 该网站的游戏icon
        }
    ]
}, { autoIndex: false});

mongoose.model('Site', SiteSchema);
