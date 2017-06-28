/*
* @Author: Edon
* @Date:   2017-06-21 15:25:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-27 17:31:08
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
     	
     	'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js'],
        'common':['./src/page/common/index.js'], 
     	'result':['./src/page/result/index.js'],
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
            node_modules  : __dirname + '/node_modules'
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
         new HtmlWebpackPlugin(getHtmlconfig('login','用户登录')),
         new HtmlWebpackPlugin(getHtmlconfig('result','操作结果'))
     ]
 };
 // if('dev'===WEBPACK_ENV){
 //    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 // }
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
