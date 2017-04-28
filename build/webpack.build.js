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
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};

/*minify js plugin for production build*/
