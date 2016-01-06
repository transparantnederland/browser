/*
 * action types
 */

export var SET_CONCEPT = 'ADD_CONCEPT';
export var SET_TYPE = 'SET_TYPE';
export var SET_VALUE = 'SET_VALUE';

/*
 * action creators
 */

export function setConcept(concept) {
  // TODO: add validation
  return { type: SET_CONCEPT, payload: { concept } };
}

export function setType(type) {
  // TODO: add validation
  return { type: SET_TYPE, payload: { type } };
}

export function setValue(value) {
  // TODO: add validation
  return { type: SET_VALUE, payload: { value } };
}
