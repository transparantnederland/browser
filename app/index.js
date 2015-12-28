import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import IndexView from './containers/IndexView';

var el = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <IndexView />
  </Provider>,
  el
);
