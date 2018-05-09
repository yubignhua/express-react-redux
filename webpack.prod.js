/**
 * Created by yubh on 2017/12/13.
 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

const assetArray = ['react', 'react-dom', 'immutable', 'react-router', 'redux', 'react-redux', 'webpack-zepto'];
const entryIndex = 'app/index.js';
module.exports = merge(common, {
    entry:{
        index:path.resolve(__dirname,entryIndex),
        vendor: assetArray
    },
    output:{
        path: path.resolve(__dirname, 'build'),
        //filename: '[name].js',
        //chunkFilename: '[name].js'
        filename: '[name]-[chunkhash:5].js',
        chunkFilename: '[name].[chunkhash:5].js'
    },
    //devtool: 'source-map',
    plugins: [
        
        new CleanWebpackPlugin(['build']),
        /**
         * HtmlWebpackPlugin=>修改 html 模板引用并(如果引用名称更改则将最新的引用名称引入模板) 将 html 模板放入打包目录
         */
        new HtmlWebpackPlugin({
            title: 'production',// 设置模板标题
            template: 'templates/webpack-react.html'//html 模板位置
        }),
        /**
         * 确保在不更改 vender 内容每次编译vendor的hash值不变有利于浏览器缓存 vender
         */
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        /**
         * 提取公共代码
         */
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],//公共代码命名为 vendor
            filename: 'vendor.[chunkhash:5].js',//将指定的第三方类库打包为 vender.js
            minChunks: 4//公共代码判断标准  文件被引用4次便打包到 vendor;
        }),
        /**
         *  代码压缩
         */
        new UglifyJSPlugin(),

    ]
});