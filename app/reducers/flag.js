import * as actions from './../actions/flag';

function relations(state = null, action) {
  switch (action.type) {
    case actions.ADD_FLAG:
      return Object.assign({}, action.payload);
    case actions.UPDATE_FLAG:
      return Object.assign({}, state, {
        value: Object.assign({}, state.value, action.payload.value),
      });
    case actions.RESET_FLAG:
      return null;
    default:
      return state;
  }
}

export default relations;
