/*
 * action types
 */

export var ADD_RELATION = 'ADD_RELATION';

/*
 * action creators
 */

export function addRelation(relation) {
  // TODO: add validation
  return { type: ADD_RELATION, payload: { relation } };
}
