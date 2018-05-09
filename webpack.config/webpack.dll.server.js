var path = require("path"),
    fs = require('fs'),
    webpack = require("webpack");
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log("=============",process.env.NODE_ENV)

var entryIndex = 'app/index.js';
module.exports = {
    entry:{
        index:path.resolve(__dirname,entryIndex),
    },
    output:{
        path: path.resolve(__dirname, 'dll'),
        // filename: '[name]-[chunkhash:5].js',
        // chunkFilename: '[name].[chunkhash:5].js',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    devtool: 'inline-source-map',
    //本地服务配置
    devServer: {
        contentBase: path.resolve(__dirname, 'dll'),//dll 文件里内容改变会自动刷新页面
        hot: true,
        port: 8082//设置端口号8082
    },
    module: {
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
    },
    plugins: [
        // new CleanWebpackPlugin(['dll'], {
        //     verbose: true,
        //     dry: false,
        //     exclude: ['manifest.json','vendor.js','index.html']
        // }),
        /**
         * 确保在不更改 vender 内容每次编译vendor的hash值不变有利于浏览器缓存 vender
         */
        new webpack.HashedModuleIdsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/manifest.json')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })

    ],
    
    resolve: {
        extensions: ['.js', '.jsx','.json'],//自动解析确定的后缀能够使用户在引入模块时不带后缀名:import File from '../path/to/file'
        alias: {
            containers: __dirname + '/app/containers',
            components: __dirname + '/app/components',
            reducers: __dirname + '/app/reducers',
            utils: __dirname + '/app/utils',
            style: __dirname + '/app/style'
        }
    }
}