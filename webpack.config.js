var webpack = require('webpack'),
    path = require('path'),
    extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // module: {
    //     loaders: [{
    //             test: /\.scss$/,
    //             loader: extractTextPlugin.extract('css-loader!sass-loader')
    //         }

    //     ]

    // },
    // Finds .scss files from path...then bundles in "bundle.css" into /dist/css folder
    module: {
        rules: [{
            test: /.scss$/,
            use: extractTextPlugin.extract({
                use: [
                    "css-loader",
                    "sass-loader?sourceMap"
                ],
                publicPath: "/dist/css/"
            })
        }]
    },
    plugins: [
        new extractTextPlugin({
            filename: "bundle.css",
            disable: false,
            allChunks: true
        })
    ]
}