/**
 * Created by yubh on 2017/12/13.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;
const APP_ENTRY_PATH = 'app/index.js';
const ASSETS = ['react', 'react-dom', 'immutable', 'react-router', 'redux', 'react-redux', 'webpack-zepto'];
const derName = __dirname;
console.log("NODE_ENV====",NODE_ENV)


const webpackConfig = {
    name: 'client',
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx','.json'],//自动解析确定的后缀能够使用户在引入模块时不带后缀名:import File from '../path/to/file'
        alias: {
            containers: derName + '/app/containers',
            components: derName + '/app/components',
            reducers: derName + '/app/reducers',
            utils: derName + '/app/utils',
            style: derName + '/app/style'
        }
    },
    module: {},
    plugins:[],
}





switch (NODE_ENV){
    case "PRODUCTION":
        webpackConfig.entry = {
            entry:{
                index:path.resolve(__dirname,APP_ENTRY_PATH),
                vendor: ASSETS
            },
        };break;
    case "DEVELOPMENT":
        webpackConfig.entry = {
            entry:{
                index:path.resolve(__dirname,APP_ENTRY_PATH),
                vendor: ASSETS
            },
        };break;
    case "DLL_SERVER":
        webpackConfig.entry = {
            entry:{
                index:path.resolve(__dirname,APP_ENTRY_PATH),
            },
        };break;
    case "DLL_LOCAL":
        webpackConfig.entry = {
            entry:{
                index:path.resolve(__dirname,APP_ENTRY_PATH),
            },
        };break;
        
}


switch (NODE_ENV){
    case "PRODUCTION":
        webpackConfig.output = {
            path: path.resolve(__dirname, 'build'),
            filename: '[name]-[chunkhash:5].js',
            chunkFilename: '[name].[chunkhash:5].js',
        };break;
    case "DEVELOPMENT":
        webpackConfig.output = {
            path: path.resolve(__dirname, 'build'),
            // filename: '[name]-[chunkhash:5].js',
            // chunkFilename: '[name].[chunkhash:5].js',
            filename: '[name].js',
            chunkFilename: '[name].js'
        };break;
    
}


switch (NODE_ENV){
    case "PRODUCTION":
        webpackConfig.plugins.push(
            new CleanWebpackPlugin(['build']),
            new HtmlWebpackPlugin({
                title: 'production',// 设置模板标题
                template: 'templates/webpack-react.html'//html 模板位置
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor'],//公共代码命名为 vendor
                filename: 'vendor.js',//将指定的第三方类库打包为 vender.js
                minChunks: 4//公共代码判断标准  文件被引用4次便打包到 vendor;
            }),
            new webpack.HashedModuleIdsPlugin(),
            new UglifyJSPlugin()
        );break;
    case "DEVELOPMENT":
}

webpackConfig.module = {
    rules: [
        {
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        },
        {
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader?cacheDirectory=true',
                options: {
                    presets: ["es2015","stage-0","react"],
                    plugins: ['transform-runtime']
                }
            }
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        },

    ]

};

console.log('webpackConfig',webpackConfig)


module.exports = webpackConfig;

//export default webpackConfig








