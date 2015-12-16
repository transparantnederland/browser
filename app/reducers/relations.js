import { REHYDRATE } from 'redux-persist/constants';
import * as actions from './../actions/relations';

function relations(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return (action.key === 'relations' && action.payload) || state;
    case actions.ADD_RELATION:
      return [...state, action.payload.relation];
    default:
      return state;
  }
}

export default relations;
