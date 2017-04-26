const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

const build = path.resolve(__dirname, '../public');
const entry = [path.resolve(__dirname, '../src/js/index.js')];
const indexPage = path.resolve(__dirname, '../src/html/index.html');

module.exports = { dev, build, entry, indexPage };