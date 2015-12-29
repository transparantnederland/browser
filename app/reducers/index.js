import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import api from '../middleware/api';

const reducers = combineReducers(Object.assign({}, {
  router,
}, api.reducers));

export default reducers;
