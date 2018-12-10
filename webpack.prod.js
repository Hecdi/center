const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, 'release/website');

module.exports = merge(common, {
    mode:'production',
  //  devtool:'source-map',
    plugins: [
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('development'),
            'DEBUG': JSON.stringify(false)}),
        new CleanWebpackPlugin(BUILD_DIR)
    ]
});

