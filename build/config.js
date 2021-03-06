const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

const build = path.resolve(__dirname, '../public');
const entry = [path.resolve(__dirname, '../src/js/index.js')];
const indexPage = path.resolve(__dirname, '../src/html/index.html');

const apiUrl = 'https://infinite-reaches-86789.herokuapp.com/';

module.exports = { dev, build, entry, indexPage, apiUrl };