'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RawSchema = new Schema({
    meta: {type: String},
    data: {type: String}
}, {capped: { size: 1024, max: 3000, autoIndexId: false }});

mongoose.model('Raw', RawSchema);
