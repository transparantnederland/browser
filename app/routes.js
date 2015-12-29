import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/App';
import IndexPage from './containers/IndexPage';
import PersonPage from './containers/PersonPage';
import OrganizationPage from './containers/OrganizationPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage}/>
    <Route path="/person/:dataset/:id" component={PersonPage}/>
    <Route path="/organization/:dataset/:id" component={OrganizationPage}/>
  </Route>
);
