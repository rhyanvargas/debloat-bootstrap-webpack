"use strict";

const webpack = require('webpack'),
    path = require('path'),
    extractTextPlugin = require('extract-text-webpack-plugin'),
    glob = require('glob'),
    purify = require('purifycss-webpack-plugin');

let config = {

    entry: {
        // Auto-detect all pages in directory
        'myPages': glob.sync('./src/js/*.js')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        watchContentBase: true,
        port: 9000,
        compress: true

    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                // scss and css loaders
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new extractTextPlugin({
            filename: "./css/bundle.css",
            disable: false,
            allChunks: true
        })
        // new purify({
        //     basePath: __dirname,
        //     paths: [
        //         './dist/*.html'
        //     ],
        //     purifyOptions: {
        //         minify: true
        //     }
        // })
    ]
};

module.exports = config;