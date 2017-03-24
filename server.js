const express  = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.listen(3001, () => {
  console.log(process.env.NODE_ENV);
  console.log('http://localhost:3001')
});