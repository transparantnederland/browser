import * as actions from './../actions/flag';

const initialState = {
  concept: null,
  type: null,
  value: null,
};

function relations(state = null, action) {
  switch (action.type) {
    case actions.ADD_RELATION:
      return Object.assign({}, initialState, {
        concept: action.payload.source,
        type: 'missing-relation',
        value: {
          concept: action.payload.target,
          type: 'tnl:same',
        },
      });
    case actions.UPDATE_RELATION_TYPE:
      return Object.assign({}, state, {
        value: Object.assign({}, state.value, {
          type: action.payload.type,
        }),
      });
    case actions.RESET_FLAG:
      return null;
    default:
      return state;
  }
}

export default relations;
