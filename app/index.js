import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';

import store from './store';

import IndexView from './containers/IndexView';
import PitView from './containers/PitView';
import Header from './components/Header';

const history = createHistory();

import './index.css';

syncReduxAndRouter(history, store);

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={IndexView}/>
        <Route path="/:dataset/:id" component={PitView}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
