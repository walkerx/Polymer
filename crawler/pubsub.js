'use strict';
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var db = require('../models');

var PubSub = function(){
    init();
};

util.inherits(PubSub, EventEmitter);

var init = function(){
    this.cursor = db.Raw.find({}, {tailable: true, timeout: false, sortValue: {$natural: -1},
        numberOfRetries: Number.MAX_VALUE, tailableRetryInterval: 200}).lean().exec();
};



module.exports = new PubSub();
//db.Raw.find({}).tailable(true, {numberOfRetries:Number.MAX_VALUE, tailableRetryInterval: 200});
