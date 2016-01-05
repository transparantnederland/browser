import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import api from '../utils/api';
import admin from '../utils/admin';

const reducers = combineReducers(Object.assign({}, {
  router,
}, api.reducers, admin.reducers));

export default reducers;
