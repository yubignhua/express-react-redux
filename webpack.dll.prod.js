/**
 * Created by yubh on 2017/12/17.
 */
const webpack = require('webpack');
const path = require('path');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ASSRSARRAY = ['react', 'react-dom', 'immutable', 'react-router', 'redux', 'react-redux','fastclick','classnames','react-if','webpack-zepto','iscroll','lazy-reducer','prop-types','react-loading','redux-actions','redux-thunk','antd-mobile'];//jquery
const ENTRYINDEX = 'app/index.js';

console.log('process.env.NODE_ENV====',process.env.NODE_ENV);
module.exports = merge(common, {
    entry:{
        index:path.resolve(__dirname,ENTRYINDEX),
    },
    devtool: 'source-map',
    output:{
        publicPath: './',//为index.html 引用文件产生前缀 =>会对热更新产生影响 dev下将其注释掉
        //path: path.resolve(__dirname, 'dist'),
        //path: '/Users/cy/myTest/express/dist',
        path: (process.env.NODE_ENV === 'production')?'/Users/cy/myTest/express/dist':path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].js',
        chunkFilename: 'js/[name].[hash].js'
    },
    module: {
        
    },

    
    plugins: [
        //(process.env.NODE_ENV === 'server')?new CleanWebpackPlugin(['/Users/cy/myTest/express/dist']):new CleanWebpackPlugin(['dist']),
        new CleanWebpackPlugin(['/Users/cy/myTest/express/dist']),
        new AutoDllPlugin({
            debug: true,
            inject: true,
            filename: '[name]_[hash].js',
            path: './dll',
            entry: {
                vendor: ASSRSARRAY
            },
            plugins: [
                new UglifyJSPlugin({
                    cache: true,
                    parallel: 10,
                })
            ]
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'templates/index.html'//html 模板位置
        }),
        new UglifyJSPlugin({
            cache: true,
            parallel: 10,
            warningsFilter:true
        }),
       

    ],
});