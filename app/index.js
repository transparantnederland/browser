import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import MainView from './containers/MainView';

var el = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <MainView />
  </Provider>,
  el
);
