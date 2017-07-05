/*
* @Author: Edon
* @Date:   2017-06-21 15:25:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-05 08:34:56
*/
'use strict';
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置，怕冲突所以用 WEBPACK_EN 怕出错，用容错的兼容 dev环境下
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
//获取html-webpack-plugin参数的方法
var getHtmlconfig =function(name,title){
    return {
        template     : './src/view/'+name+'.html',
        filename     : 'view/'+name+'.html',
        title        : title,
        inject       : true,
        hash         : true,
        chunks       : ['common',name]
    }
}
 var config = {
     entry:{
     	
     	'index'              :['./src/page/index/index.js'],
        'user-login'         :['./src/page/user-login/index.js'],
        'common'             :['./src/page/common/index.js'], 
     	'result'             :['./src/page/result/index.js'],
        'user-register'      :['./src/page/user-register/index.js'],
        'user-pass-reset'    :['./src/page/user-pass-reset/index.js'],
        'user-center'        :['./src/page/user-center/index.js'],
        'user-center-update' :['./src/page/user-center-update/index.js'],
        'user-pass-update'   :['./src/page/user-pass-update/index.js']
     },
     output : {
         path       : __dirname + '/dist/',
         publicPath :'/dist/',
         filename   : 'js/[name].js'
     },
     externals : {
     	// 此处的jQuery的Q要大写，jQuery才是jq真正暴露的全局对象
     	'jquery':'window.jQuery'
     },
     module: {
   		 loaders: [
   		 	// 探测到以css结尾的文件，就用 css-loader style-loader
     			 // { test: /\.css$/, 
     			 // 	loader:ExtractTextPlugin.extract("style-loader","css-loader")
                {test: /\.css$/,loader:  ExtractTextPlugin.extract("style-loader","css-loader")},
                {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
    		    {test: /\.string$/,loader: 'html-loader' }
            ]
  },
     resolve : {
        alias : {
            util          : __dirname + '/src/util',
            page          : __dirname + '/src/page',
            service       : __dirname + '/src/service',
            image         : __dirname + '/src/image',
            node_modules  : __dirname + '/node_modules',
            service       : __dirname + '/src/service',
        }
     },
     plugins: [  
                //独立通用模板到js/base.js
        	 new webpack.optimize.CommonsChunkPlugin({
     	 	name: 'common',
     	 	filename : 'js/base.js'
     	 }),
             //把css单独打包到文件夹里
     	 new ExtractTextPlugin("css/[name].css"),
         //html模板的处理
         new HtmlWebpackPlugin(getHtmlconfig('index','首页')),
         new HtmlWebpackPlugin(getHtmlconfig('user-login','用户登录')),
         new HtmlWebpackPlugin(getHtmlconfig('user-register','用户注册')),
         new HtmlWebpackPlugin(getHtmlconfig('result','操作结果')),
         new HtmlWebpackPlugin(getHtmlconfig('user-pass-reset','重置密码')),
         new HtmlWebpackPlugin(getHtmlconfig('user-center','个人中心')),
         new HtmlWebpackPlugin(getHtmlconfig('user-center-update','修改个人信息')),
         new HtmlWebpackPlugin(getHtmlconfig('user-pass-update','修改密码'))
     ]
 };
 // if('dev'===WEBPACK_ENV){
 //    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 // }
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
