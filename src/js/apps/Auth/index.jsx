import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import {AppContainer} from 'react-hot-loader';

const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app.jsx', (arg) => {
    const App = require('./app.jsx').default;
    render(App);
  });
}

export default function() {
}
