var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: __dirname + '/packages/react-look/demo/client.js'
  },
  output: {
    path: path.join(__dirname),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }
    ]
  }
}
