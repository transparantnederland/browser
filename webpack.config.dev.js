var path = require('path');
var webpack = require('webpack');
var config = require('config');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    'normalize-css',
    './app/index',
  ],
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config),
      '__DEV__': true,
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app'),
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.ttf$/,
      loader: 'file-loader',
    }, {
      test: /\.svg$/,
      loader: 'file-loader',
    }],
  },
};
