const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const { dev, build, entry, indexPage, apiUrl } = require('./config');

const config = {
  entry,
  output: {
    path: build,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /public/],
        use: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.styl$/,
        exclude: [/node_modules/, /public/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.styl', '.css', '.jsx'],
    alias: {
      libs: path.resolve(__dirname, '../src/js/libs/'),
      apps: path.resolve(__dirname, '../src/js/apps/'),
      components: path.resolve(__dirname, '../src/js/commonComponents/')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(!dev),
      PRODUCTION_API_URL: JSON.stringify(apiUrl)
    }),
    new ExtractTextPlugin({
      filename: '../../css/[name].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: indexPage,
      filename: 'index.html',
      inject: 'body'
    })
  ]
};

module.exports = dev
  ? merge(config, require('./webpack.dev.js'))
  : merge(config, require('./webpack.build.js'));