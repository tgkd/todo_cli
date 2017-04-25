const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

const build = path.resolve(__dirname, '../public/js');
const dist = path.resolve(__dirname, '../public');
const entry = [path.resolve(__dirname, '../src/js/index.js')];

module.exports = { dev, build, entry, dist };