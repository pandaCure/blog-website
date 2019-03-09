const path = require('path');
const webpack = require('webpack');
console.log(__dirname);
console.log(path.join(__dirname, '../public/static/js'));
const AssetsPlugin = require('assets-webpack-plugin');
module.exports = {
    entry: {
        vendor: [
            'mobx/lib/mobx.es6.js',
            'react',
            'react-dom',
            'react-router-dom',
            'axios'
        ]
    },
    output: {
        path: path.join(__dirname, '../public/static/js'),
        filename: 'dll.[name]_[hash:6].js',
        library: '[name]_[hash:6]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_[hash:6]',
            context: process.cwd()
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: path.join(__dirname, '/')
        })
    ]
};
