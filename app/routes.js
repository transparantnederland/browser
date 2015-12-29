import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/App';
import IndexPage from './containers/IndexPage';
import PitPage from './containers/PitPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage}/>
    <Route path="/:dataset/:id" component={PitPage}/>
  </Route>
);
