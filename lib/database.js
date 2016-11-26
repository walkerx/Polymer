'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var init  = require('./dbInit');

var db = function () {
    return {
        config: function (conf) {
            var connectString = 'mongodb://' + conf.host + ':' + conf.port + '/' + conf.db;

            mongoose.connect(connectString);
            //mongoose.set('debug', true);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                console.log('db connection open');
                init();
            });
        },
        close: function () {
            mongoose.connection.close();
        }
    };
};

module.exports = db();
