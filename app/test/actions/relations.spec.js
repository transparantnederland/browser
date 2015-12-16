import expect from 'expect';

import * as actions from '../../actions/relations';
import * as fixtures from '../fixtures';

describe('relations actions', () => {
  it('addRelation should create ADD_RELATION action', () => {
    expect(actions.addRelation(fixtures.relation)).toEqual({
      type: actions.ADD_RELATION,
      payload: {
        relation: fixtures.relation,
      },
    });
  });
});
