'use strict';

var db = require(appRoot + '/lib/database'),
    fs = require('fs'),
	expressValidator = require('../lib/validator')();

module.exports = function spec(app) {
	app.on('start',function(){
        console.log('Application ready to serve requests.');
        console.log('Environment: %s', app.kraken.get('env:env'));
	});

	app.on('middleware:before:session', function (eventargs) {
		app.use(expressValidator);
	});
	app.on('middleware:after:session', function (eventargs) {

	});
    return {
        onconfig: function(config, next) {
			//solr.config(config.get('solr'));
            db.config(config.get('mongodb'));
            //redis.config(config.get('redis'));

			next(null, config);
        }
    };
};
