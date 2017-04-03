/*expressJS static server*/
const express  = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.use('*', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(3001, () => {
  console.log(process.env.NODE_ENV);
  console.log('http://localhost:3001')
});