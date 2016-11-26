'use strict';

var mongo = require('../../models');
var config = require('./config.json');
var conf = require('../../config/config.json');
var async = require('async');
var Runner = function () {
    this.tasks = {};
    this.games = config.games;
    this.sites = config.sites;
    for (var i = 0; i < config.sites.length; i++) {
        var eName = config.sites[i].eName;
        this.tasks[eName] = require('./' + eName);
    }
};

Runner.prototype.getRooms = function () {
    var self = this;
    this.startAt = new Date();
    var start = this.startAt.getTime();
    console.log('start:' + this.startAt);
    var jobs = [];
    self.sites.map(function (site) {
        site.games.map(function (game) {
            var job = function(callback) {
                self.tasks[site.eName].getRoomsByGame(game, callback);
            };
            jobs.push(job);
        })
    });
    async.parallel(jobs,
        function(err, results) {
            var end = new Date().getTime();  // 任务结束时间
            var timeConsumed = end - start;    // 任务耗时
            if(err){
                console.log('error:' + err);
                console.log('finish:' + timeConsumed + 'ms');
            }
            console.log('finish:' + timeConsumed + 'ms');
            mongo.Live.remove({updatedAt: {$lt: self.startAt.getTime()}}).exec();
            db.close();
            process.exit(0);
            // self.expireLive(self.startAt);
        });
};

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connectString = 'mongodb://' + conf.mongodb.host + ':' + conf.mongodb.port + '/' + conf.mongodb.db;
mongoose.connect(connectString);
mongoose.set('debug', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('db connection open');
    var runner = new Runner();
    runner.getRooms();
});












