'use strict';
//var validator = require('validator'),
var expressValidator = require('express-validator');

//expressValidator = expressValidator();
expressValidator.validator.extend('isMillionSeconds', function (str) {
	if ((/(-)?\d+/).test(str)) {
		if (Number(str) > -2209017599701 && Number(str) < 2524579200206)
			return true;
		else return false;
	} else
		return false;

	//限制时间为1900.00.00 00：00：00开始至2050。00.00
});

expressValidator.validator.extend('isObjectId', function (str) {
	return new RegExp('^[0-9a-fA-F]{24}$').test(str);
});

expressValidator.validator.extend('isHeight', function (str) {
	return (/^\d{2,3}\.\dCM$/).test(str);
});

expressValidator.validator.extend('isWeight', function (str) {
	return (/^\d{2,3}\.\dKg$/).test(str);
});

//匹配字母或数字或下划线或汉字
expressValidator.validator.extend('isValidChar', function (str) {
	return (/^[_0-9a-zA-Z\u4E00-\u9FFF]+$/).test(str);
});

//匹配正数
expressValidator.validator.extend('isPositive', function (str) {
	return (/^(?:0|[1-9][0-9]*)$/).test(str);
});

//匹配6位数字
expressValidator.validator.extend('isValidCode', function (str) {
	return (/^\d{6}$/).test(str);
});

//测试为空串
expressValidator.validator.extend('isNotBlank', function (str) {
	return !(/(^\s*)(\s*)(\s*$)/).test(str);
});
//对象为数组
expressValidator.validator.extend('isArray', function (obj) {
	return obj && ( obj instanceof Array);
});

//匹配类型
expressValidator.validator.extend('isType', function (str) {
	return (/^[0,1]$/).test(str);
});

//匹配活动强度
expressValidator.validator.extend('isActivyIntensity', function (str) {
	return (/^[1,2,3]$/).test(str);
});

//匹配字母或数字或下划线或汉字
expressValidator.validator.extend('isTelPhone', function (str) {
	return (/^((1[1-9]{1}[0-9]{1})+\d{8})$/).test(str);
});

expressValidator.validator.extend('isGirthLine', function (str) {
	return (/^\d{2,3}(\.\d)?$/).test(str);
});
//脏话过滤
//TODO

expressValidator.validator.extend('isVersion', function (str) {
    return (/^\d{1,2}(\.\d{1,2}){1,3}$/).test(str);
});

module.exports = expressValidator;
module.exports.validator = expressValidator.validator;
