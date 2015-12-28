import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { routeReducer } from 'redux-simple-router';

import api from './api';
import relations from './../reducers/relations';

const loggerMiddleware = createLogger({
  predicate: () => __DEV__,
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

const reducer = combineReducers(Object.assign({
  relations,
  routing: routeReducer,
}, api.reducers));

const store = createStoreWithMiddleware(reducer);

persistStore(store);

export default store;
