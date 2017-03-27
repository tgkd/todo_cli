import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const dev = process.env.NODE_ENV !== 'production';

const watch = process.env.NODE_ENV === 'development';


const config = {
  devtool: dev ? 'inline-source-map' : null,
  watch: watch,

  entry: {
    vendor: ['react', 'react-dom'],
    app: './src/js/index.js'
  },
  output: {
    filename: dev ? '[name].js' : '[chunkhash:12].js',
    path: path.resolve(__dirname, 'public/js')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /public/],
        use: [{loader: 'babel-loader'}]
      },
      {
        test: /\.styl$/,
        exclude: [/node_modules/, /dist/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.styl']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '../css/[name].css',
      disable: false,
      allChunks: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChuncks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChuncks: 2
    })
  ]
};

export default config;