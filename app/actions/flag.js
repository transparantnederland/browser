/*
 * action types
 */

export var ADD_FLAG = 'ADD_FLAG';
export var UPDATE_FLAG = 'UPDATE_FLAG';
export var TOGGLE_FLAG = 'TOGGLE_FLAG';
export var RESET_FLAG = 'RESET_FLAG';

const PERSON = 'tnl:Person';

/*
 * action creators
 */
export function addRelation(source, target) {
  const isSameType = (source.type === target.type) || (source.type !== PERSON && target.type !== PERSON);
  const canMerge = isSameType || source.type === PERSON;
  const concept = canMerge ? source : target;
  const type = 'missing-relation';
  const value = {
    type: isSameType ? 'tnl:same' : 'tnl:member',
    concept: canMerge ? target : source,
  };

  return {
    type: ADD_FLAG,
    payload: { concept, type, value },
  };
}

export function updateRelationType(type) {
  return { type: UPDATE_FLAG, payload: { value: { type } } };
}

export function toggleRelationFromTo() {
  return { type: TOGGLE_FLAG, payload: null };
}

export function resetFlag() {
  return { type: RESET_FLAG, payload: null };
}
