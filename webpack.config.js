/**
 * Created by yubh on 2017/12/13.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');



var entryIndex = 'app/index.js';
module.exports={
    entry:{
        index:path.resolve(__dirname,entryIndex),
    },
    output:{
        path: path.resolve(__dirname, 'build'),
        //filename: 'bundle.js',
         filename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [require('@babel/plugin-transform-object-rest-spread')]
                    }
                }
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:['file-loader']
            }
        ]
   },
    //本地服务配置
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        hot:true,
        port: 8082,//设置端口号8082
       },
    plugins:[
        //HotModuleReplacementPlugin=>模块热替换:会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        //HtmlWebpackPlugin=>修改 html 模板引用并(如果引用名称更改则将最新的引用名称引入模板) 将 html 模板放入打包目录
        new HtmlWebpackPlugin({
            title: 'Output Management',// 设置模板标题
            template: 'templates/webpack-react.html'//html 模板位置
        }),
        new CleanWebpackPlugin(['build']),
        //代码压缩
        //new UglifyJSPlugin()
    ]
};