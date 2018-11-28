const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const argv = require('yargs').argv;
const common = require('./webpack.common.js');
const BUILD_DIR = path.resolve(__dirname, 'release/website');


module.exports = merge(common, {
    mode:'development',
    devServer: {
        host: '127.0.0.1',
        port: argv.PORT||9002,
        compress: true,
        hot: true,
        open: false,
        quiet: false,
        disableHostCheck: true,
		hotOnly:true,
    },
    devtool:'cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin(
            {
            'DEBUG': JSON.stringify(true)
            }),
        new webpack.HotModuleReplacementPlugin()
    ]

});

