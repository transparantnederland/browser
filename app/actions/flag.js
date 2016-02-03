/*
 * action types
 */

export var ADD_RELATION = 'ADD_RELATION';
export var UPDATE_RELATION_TYPE = 'UPDATE_RELATION_TYPE';
export var RESET_FLAG = 'RESET_FLAG';

/*
 * action creators
 */

export function addRelation(source, target) {
  return { type: ADD_RELATION, payload: { source, target } };
}

export function updateRelationType(type) {
  return { type: UPDATE_RELATION_TYPE, payload: { type } };
}

export function resetFlag() {
  return { type: RESET_FLAG, payload: null };
}
