import * as actions from './../actions/relations';

function relations(state = [], action) {
  switch (action.type) {
    case actions.ADD_RELATION:
      return [...state, action.payload.relation];
    default:
      return state;
  }
}

export default relations;
