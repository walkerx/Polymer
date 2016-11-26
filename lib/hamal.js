
'use strict';

var Emitter = require('events').EventEmitter,
    utils = require('util'),
    _ = require('lodash'),
    CronTime = require('cron').CronTime;



var Hamal = function () {
    this._jobs = {};
    this._running = [];
};

utils.inherits(Hamal, Emitter);

Hamal.prototype.define = function (name, options, processor) {
    if (!processor) {
        processor = options;
        options = {};
    }
    this._jobs[name] = {
        fn: processor,
        options: options
        //running: 0
    };
};

Hamal.prototype.validJob = function (name) {
    return this._jobs.hasOwnProperty(name);
};

Hamal.prototype.jobs = function () {
    return this._jobs;
};

Hamal.prototype.running = function () {
    return this._running;
};

Hamal.prototype.remove = function (scheduleId) {
    this.removeListener(scheduleId, this.listener);
    var that = this;
    that._running.forEach(function(element, index){
        if(element.id ===  scheduleId){
            clearTimeout(element.timeOut);
            that._running.splice(index, 1);
        }
    });
};

Hamal.prototype.update = function (schedule) {
    if (schedule.count === 0) {
        console.log(schedule.jobName + '执行次数已达到0,结束');
    } else {
        this.removeListener(schedule._id.toString(), this.listener);
        var that = this;
        that._running.forEach(function(element, index){
            if(element.id ===  schedule._id.toString()){
                clearTimeout(element.timeOut);
                that._running.splice(index, 1);
            }
        });
        schedule.cronTime = new CronTime(schedule.rule);
        schedule.nextDoAt = schedule.cronTime.sendAt();
        this.run(schedule);
    }
};

Hamal.prototype.assign = function (schedule) {
    if (schedule.count === 0) {
        console.log(schedule.jobName + '执行次数已达到0,结束');
    } else {
        if(!schedule.cronTime){
            schedule.cronTime = new CronTime(schedule.rule);
        }
        schedule.nextDoAt = schedule.cronTime.sendAt();
        this.run(schedule);
    }
};

Hamal.prototype.listener = function (schedule) {
    var that = this;
    schedule.save(function (err) {
        if (err) {
            console.log(err);
        }
        if (schedule.count === 0) {
            that.removeListener(schedule.id, that.listener);
        } else {
            //this.run(schedule);
            that.assign(schedule);
        }
    });
};

Hamal.prototype.done = function (err, self, schedule) {
    if(err) {
        schedule.lastResult = err.toString();
    }else{
        schedule.lastResult = 'finish';
    }
    schedule.lastDoneAt = new Date();
    schedule.nextDoAt = schedule.cronTime.sendAt();
    //schedule.nextDoAt = new Date(schedule.lastDoAt.getTime() + schedule.interval);
    console.log('Job name: ' + schedule.jobName + ' count:' + schedule.count + ' finish: ' + schedule.lastDoneAt);
    if (schedule.count > 0) {
        schedule.count -= 1;
    }
    self.emit(schedule.id, schedule);
};

Hamal.prototype.run = function (schedule) {
    var self = this;
    schedule.id = schedule._id.toString();
    var delay = schedule.nextDoAt.getTime() - new Date().getTime();
    if(delay > 2147483647){
        delay = 2147483647;
    }
    schedule.timeOut = setTimeout((function (schedule) {
        return function () {
            if (self._jobs[schedule.jobName]) {
                schedule.lastDoAt = new Date();
                self._jobs[schedule.jobName].fn(self, schedule, self.done);
            }
        };
    })(schedule), delay);
    var result = _.filter(self._running, function(doc) {
        return doc.id === schedule.id;
    });
    if(result.length === 0){
        self.on(schedule.id, self.listener);
        self._running.push(schedule);
    }
};

module.exports = new Hamal;
