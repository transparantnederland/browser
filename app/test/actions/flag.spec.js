import expect from 'expect';

import * as actions from '../../actions/flag';

describe('relations actions', () => {
  it('addRelation should create ADD_RELATION action', () => {
    expect(actions.addRelation({}, {})).toEqual({
      type: actions.ADD_RELATION,
      payload: {
        source: {},
        target: {},
      },
    });
  });
});
