const webpack = require('webpack');

module.exports = {
  devtool: false,
  watch: false,
  output: {
    filename: '[chunkhash:12].js'
  }
};

/*minify js plugin for production build*/
/*
 plugins: [
 new webpack.optimize.UglifyJsPlugin({
 compress: {
 warnings: false
 },
 output: {
 comments: false,
 semicolons: true
 },
 sourceMap: true
 })
 ]*/
