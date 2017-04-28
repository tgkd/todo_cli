const webpack = require('webpack');

module.exports = {
  devtool: false,
  watch: false,
  output: {
    filename: '[chunkhash:12].min.js'
  },
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
  ]
};

/*minify js plugin for production build*/
