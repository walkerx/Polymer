'use strict';

var kraken = require('kraken-js'),
    app = require('express')(),
    path = require('path'),
    port = process.env.PORT || 8000;

global.appRoot = path.resolve(__dirname);

var	options = require('./lib/spec')(app);
app.use(kraken(options));

app.listen(port, function (err) {
    if(err){
        console.log(err);
    }
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
