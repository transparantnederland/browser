/*
 * action types
 */

export var ADD_FLAG = 'ADD_FLAG';
export var UPDATE_FLAG = 'UPDATE_FLAG';
export var TOGGLE_FLAG = 'TOGGLE_FLAG';
export var RESET_FLAG = 'RESET_FLAG';

const PERSON = 'tnl:Person';
const SECTOR = 'tnl:Sector';

/*
 * action creators
 */

export function addFlag(flag) {
  return { type: ADD_FLAG, payload: flag };
}

export function addRelation(source, target) {
  return (dispatch, getState) => {
    const { data } = getState();
    const relationTypes = data.relationTypes && data.relationTypes.data;
    const isSameType = (source.type === target.type) || ((source.type !== PERSON && target.type !== PERSON) && !(source.type === SECTOR || target.type === SECTOR));
    const hasSector = source.type === SECTOR || target.type === SECTOR;
    const hasPerson = source.type === PERSON || target.type === PERSON;
    const defaultRelation = hasSector ? 'tnl:related' : 'tnl:member';
    const defaultSameRelation = 'tnl:same';
    const canMerge = isSameType || source.type === PERSON || target.type === SECTOR;
    const relationFilter = (type) => {
      if (hasSector) {
        return ['tnl:related'].indexOf(type) > -1;
      } else if (isSameType && hasPerson) {
        return ['tnl:same'].indexOf(type) > -1;
      } else if (isSameType) {
        return ['tnl:same', 'tnl:parent'].indexOf(type) > -1;
      }

      return ['tnl:same', 'tnl:parent'].indexOf(type) === -1;
    };

    const flag = {
      concept: canMerge ? source : target,
      type: 'missing-relation',
      value: {
        type: isSameType ? defaultSameRelation : defaultRelation,
        concept: canMerge ? target : source,
      },
      meta: {
        relationOptions: relationTypes.filter(relationFilter),
        canToggle: isSameType && !hasPerson,
      },
    };

    return dispatch(addFlag(flag));
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
