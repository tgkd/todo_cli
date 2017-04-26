const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');

const { dev, build } = require('./config');

module.exports = {
  devtool: 'eval-source-map',
  watch: dev,
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?noInfo=true&reload=false',
    'webpack/hot/only-dev-server'
  ],
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      enforce: "pre",
      exclude: /(node_modules)/,
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }]
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};