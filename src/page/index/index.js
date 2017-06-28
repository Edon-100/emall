/*
* @Author: Administrator
* @Date:   2017-06-21 15:16:24
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-27 15:47:26
*/
'use strict';
require('../module.js');
require('./index.css');
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/nav-side/index.js');
require('page/common/header/index.js');

var navSide         = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
navSide.init({
	name : 'pass-update'
});

// _mm.request({
// 	url: '/product/list.do?keyword=1',
// 	success : function(res){
// 		console.log(res);
// 	},
// 	error: function(errMsg){
// 		console.log(errMsg);
// 	}
// });
// console.log(_mm.getUrlParam('test'));
// var html = '<div>{{data}}</div>';
// var data = {
// 	data :123
// };
// console.log(_mm.renderHtml(html,data));