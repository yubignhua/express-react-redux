/**
 * Created by yubh on 2017/12/15.
 */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'immutable', 'react-router', 'redux', 'react-redux', 'webpack-zepto'],
    },
    output: {
        path: path.join(__dirname, "dll"),
        filename: '[name].js',
        library: "[name]_[chunkhash]"
    },
    plugins: [
        //new CleanWebpackPlugin(['dll']),
        new CleanWebpackPlugin(['dll/vendor.js','dll/manifest.*.js']),
        new webpack.DllPlugin({
            path: path.join(__dirname, "dll", "manifest.json"),
            name: "[name]_[chunkhash]",
            context: __dirname
        }),
        // new UglifyJSPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],


};

