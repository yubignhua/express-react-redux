/**
 * Created by yubh on 2017/12/17.
 */
const webpack = require('webpack');
const path = require('path');
const AutoDllPlugin = require('autodll-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // css单独打包

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const ASSRSARRAY = ['react', 'react-dom', 'immutable', 'react-router', 'redux', 'react-redux','fastclick','classnames','react-if','webpack-zepto','iscroll','lazy-reducer','prop-types','react-loading','redux-actions','redux-thunk','antd-mobile'];//'antd-mobile'
const ENTRYINDEX = 'app/index.js';

module.exports = merge(common, {
    entry:{
        index:path.resolve(__dirname,ENTRYINDEX)
    },
    devtool: 'source-map',
    output:{
        //publicPath: './',
        path: path.resolve(__dirname, 'dll'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname, 'dll'),//dll 文件里内容改变会自动刷新页面
        hot: true,
        historyApiFallback: true,
        port: 8083,//设置端口号8083
        proxy: {
            '/cyhospital/*': {//已 cyhospital 开头的前面加上域名:http://10.9.91.246:8080/
                //target: 'http://10.9.91.246:8080/cyhospital/weihospital/yanda/weiWangZhanIndex/?is_json=1',
                target: 'http://10.9.91.246:8080/',
                //pathRewrite: {'^/column' : '/column'},
                changeOrigin: true,
                secure: false
            },
            '/test/*':{
                target: 'http://192.168.1.194:3003/',
                changeOrigin: true,
                secure: false
            },
            '/mock/*':{
                target: 'http://10.9.89.126:80/',
                changeOrigin: true,
                secure: false
            }

        }

    },
    plugins: [
        //new CleanWebpackPlugin(['dll']),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new AutoDllPlugin({
            debug: true,
            inject: true,
            filename: '[name].js',
            path: './dist',
            entry: {
                vendor: ASSRSARRAY
            }
        })
    ],
});

