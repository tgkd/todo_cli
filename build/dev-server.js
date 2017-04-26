/*https://webpack.js.org/guides/hmr-react/#components/sidebar/sidebar.jsx*/

const express = require('express');
const webpack = require('webpack');
const path = require('path');
const http = require('http');

const { build } = require('./config');

const config = require('./webpack.config');
const compiler = webpack(config);

const app = express();
const server = http.createServer(app);

const devMiddleware = require("webpack-dev-middleware")(compiler, {
  publicPath: config.output.publicPath,
  quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
});

app.use(devMiddleware);
app.use(hotMiddleware);

app.use(express.static(build));

app.use('/*', (req, res) => {
  res.sendFile(path.join(build, 'index.html'));
});

server.listen(process.env.PORT || 3001);