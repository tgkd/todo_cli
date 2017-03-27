/*expressJS static server*/
const express  = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3001, () => {
  console.log(process.env.NODE_ENV);
  console.log('http://localhost:3001')
});