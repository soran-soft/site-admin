'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, '/static'),
    publicPath: '../',
    filename: 'js/app.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?stage=0&experimental&optional[]=runtime'],
        exclude: /node_modules/
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:["last 2 version", "> 1%"]}')},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:["last 2 version", "> 1%"]}!sass')},
      {test: /\.(jpg|png|gif)$/, loader: 'file?name=images/[name].[ext]'},
      {test: /\.(svg|ttf|eot|woff2?)($|\?[a-zA-Z]=\d[\.\d]+$)/, loader: 'file?name=fonts/[name].[ext]'}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('js/common.js'),
    new ExtractTextPlugin('css/style.css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'BROWSER': true
      }
    })
  ]
};