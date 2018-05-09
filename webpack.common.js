/**
 * Created by yubh on 2017/12/13.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // css单独打包
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


// Create multiple instances
// const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css');
//const extractSCSS = new ExtractTextPlugin('[name]-.chunkhash]-scss.css');

const derName = __dirname;

const entryIndex = 'app/index.js';
module.exports={
    module: {
        rules: [

            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                //use: ['style-loader','css-loader',"sass-loader",'postcss-loader']
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader','postcss-loader'],
                })
            },
            {
                test: /\.css$/,
                //use: [ 'style-loader','css-loader','postcss-loader' ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",'postcss-loader'],
                })
            },
            {   //专门处理 anti-mobile 中的 less 文件
                test: /\.less$/,
                use: [
                    {loader: "style-loader"}, // creates style nodes from JS strings
                    {loader: "css-loader"}, // translates CSS into CommonJS
                    {loader: "less-loader"} // compiles Less to CSS
                ]
            },
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                    options: {
                        presets: ["es2015","stage-0","react"],
                        //import:按需加载antd-mobile   transform-decorators-legacy:编译es6修饰器
                        plugins:["transform-decorators-legacy",'transform-runtime',["import", { libraryName: "antd-mobile", style: true}]]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: (process.env.NODE_ENV === 'production')?8192:1,//如果图片小于8192则将图片转换为 base64编码的形式
                            //name:"images/[name].[hash:8].[ext]"//指定图片存放位置,图片名称,图片hash
                            name:"images/[name].[ext]"//指定图片存放位置,图片名称,图片hash
                        }
                    }
                ]
            }
            
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx','.json'],//自动解析确定的后缀能够使用户在引入模块时不带后缀名:import File from '../path/to/file'
        alias: {//设置路径简写
             containers: derName + '/app/containers',
             components: derName + '/app/components',
             reducers: derName + '/app/reducers',
             utils: derName + '/app/utils',
             style: derName + '/app/style'
        }
    },
    plugins:[
        //new ExtractTextPlugin('[name]-[chunkhash]-css.css'),
        //new ExtractTextPlugin('[name]-[chunkhash]-scss.css'),
        //new ExtractTextPlugin('style.css'),
        new ExtractTextPlugin('css/[name].css'),
        // new ExtractTextPlugin({
        //     filename:'[name].css',
        //     allChunks:true
        // }),

        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.optimize\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: { discardComments: {removeAll: true } },
        //     canPrint: true
        // }),

        
       /* new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
               // 'process.env.NODE_ENV': JSON.stringify('production')
            },
        }),
        */


        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        //     },
        // }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.ProvidePlugin({
            imt: 'immutable',
            immutable: 'immutable',
            $: 'webpack-zepto',
            IScroll:'iscroll',
            classNames:'classnames',
            //jQuery:'jquery'
        }),
        new HtmlWebpackPlugin({
            //filename: config.test.index,// index: path.resolve(__dirname, '../dist/index.html'), :输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置
            inject: true,//向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同
            template: 'templates/index.html'//html 模板位置
        })
    ]
};