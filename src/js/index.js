import React from 'react';
import ReactDOM from 'react-dom';
import App from './testDir/App';
import Auth from './libs/auth';

let authTest = new Auth;


authTest.test()
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  });


ReactDOM.render(
  <App />,
  document.getElementById('root')
);