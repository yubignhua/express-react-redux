/**
 * Created by yubh on 2017/12/13.
 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const assetArray = ['react', 'react-dom', 'immutable', 'react-router', 'redux', 'react-redux', 'webpack-zepto','jquery'];
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
    devtool: 'inline-source-map',
    //本地服务配置
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),//server 文件里内容改变会自动刷新页面
        hot: true,
        port: 8083//设置端口号8083
    },
    plugins:[
        /**
         * 确保在不更改 vender 内容每次编译vendor的hash值不变有利于浏览器缓存 vender
         */
        new webpack.HashedModuleIdsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //HotModuleReplacementPlugin=>模块热替换:会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。
        new webpack.HotModuleReplacementPlugin(),
        //new CleanWebpackPlugin(['build']),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],//公共代码命名为 vendor
            filename: 'vendor.js',//将指定的第三方类库打包为 vender.+hash
            minChunks: 4//公共代码判断标准  文件被引用4次便打包到 vendor;
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});