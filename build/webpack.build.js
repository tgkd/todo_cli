const webpack = require('webpack');

module.exports = {
  devtool: false,
  watch: false,
  output: {
    filename: '[chunkhash:12].js'
  }
};