/**
 * Created by yubh on 2017/12/17.
 */
const webpack = require('webpack');
const path = require('path');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const assetArray = ['react', 'react-dom', 'immutable', 'react-router', 'redux', 'react-redux', 'webpack-zepto'];
const entryIndex = 'app/index.js';



module.exports = merge(common, {
    entry:{
        index:path.resolve(__dirname,entryIndex),
    },
    devtool: 'source-map',
    output:{
        publicPath: './',
        path: path.resolve(__dirname, 'dist'),
        //filename: '[name].js',
        //chunkFilename: '[name].js'
        filename: '[name]-[hash].js',
        chunkFilename: '[name].[hash].js'
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new AutoDllPlugin({
            debug: true,
            inject: true,
            filename: '[name]_[hash].js',
            path: './dll',
            entry: {
                vendor: ['react', 'react-dom', 'immutable', 'react-router', 'redux', 'react-redux', 'webpack-zepto'],
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'templates/webpack-react.html'//html 模板位置
        }),
    ],
});