import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import api from './api';
import relations from './../reducers/relations';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);
const reducer = combineReducers(Object.assign({
  relations,
}, api.reducers));
const store = createStoreWithMiddleware(reducer);

export default store;
