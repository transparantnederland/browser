var path = require('path');
var webpack = require('webpack');
var config = require('config');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config)
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      include: path.join(__dirname, 'css')
    }, {
      test: /\.ttf$/,
      loader: 'file-loader',
      include: path.join(__dirname, 'fonts')
    }]
  }
};
