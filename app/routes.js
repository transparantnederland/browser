import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/App';
import MainView from './containers/MainView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainView}/>
  </Route>
);