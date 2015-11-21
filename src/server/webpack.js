'use strict';

import 'babel/polyfill';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../../webpack.config.dev';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { 
    colors: true
 }
}).listen(3001, '127.0.0.1', function (err) {
  if (err) { console.log(err); }
  console.log('Webpack listening at 3001');
});
