var webpack = require('webpack'),
    path = require('path'),
    extractTextPlugin = require('extract-text-webpack-plugin'),
    purify = require('purifycss-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        port: 9000,
        compress: true

    },
    // Finds .scss files from path...then bundles in "bundle.css" into /dist/css folder
    module: {
        rules: [{
            test: /.scss$/,
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
        }]
    },
    plugins: [
        new extractTextPlugin({
            filename: "./css/bundle.css",
            disable: false,
            allChunks: true
        }),
        new purify({
            basePath: __dirname,
            paths: [
                './dist/*.html'
            ],
            purifyOptions: {
                minify: true
            }
        })
    ]
}