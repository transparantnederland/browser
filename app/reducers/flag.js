import * as actions from './../actions/flag';

const initialState = {
  concept: null,
  type: null,
  value: null,
};

const defaultValues = {
  'duplicate': {
    type: 'tnl:same',
  },
  'missing-relation': {},
};

function relations(state = initialState, action) {
  switch (action.type) {
    case actions.SET_CONCEPT:
      return Object.assign({}, state, {
        concept: action.payload.concept,
      });
    case actions.SET_TYPE:
      return Object.assign({}, state, {
        type: action.payload.type,
        value: defaultValues[action.payload.type],
      });
    case actions.SET_VALUE:

      return Object.assign({}, state, {
        value: action.payload.value,
      });
    default:
      return state;
  }
}

export default relations;
