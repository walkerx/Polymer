'use strict';

//var moment = require('moment');
var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

exports.validateId = function (id) {
    return checkForHexRegExp.test(id);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.uid = function(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};
/**
 * 去除字符串前后空格
 * @param oriStr
 */
exports.trim = function(oriStr){
    return oriStr.replace(/(^\s*)|(\s*$)/g, '');
};

