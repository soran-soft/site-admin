'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, '/static'),
    publicPath: '//127.0.0.1:3001/static/',
    filename: 'js/app.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel?stage=0&experimental&optional[]=runtime'],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'BROWSER': true
      }
    })
  ]
};