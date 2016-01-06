import expect from 'expect';

import * as actions from '../../actions/flag';

describe('relations actions', () => {
  it('setConcept should create SET_CONCEPT action', () => {
    expect(actions.setConcept({})).toEqual({
      type: actions.SET_CONCEPT,
      payload: {
        concept: {},
      },
    });
  });
  it('setType should create SET_TYPE action', () => {
    expect(actions.setType('duplicate')).toEqual({
      type: actions.SET_TYPE,
      payload: {
        type: 'duplicate',
      },
    });
  });
  it('setValue should create SET_VALUE action', () => {
    expect(actions.setValue({})).toEqual({
      type: actions.SET_VALUE,
      payload: {
        value: {},
      },
    });
  });
});
