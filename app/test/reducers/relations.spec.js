import expect from 'expect';
import relations from '../../reducers/relations';
import * as types from '../../actions/relations';
import * as fixtures from '../fixtures';

describe('relations reducer', () => {
  it('should handle initial state', () => {
    expect(
      relations(undefined, {})
    ).toEqual([]);
  });

  it('should handle ADD_RELATION', () => {
    expect(
      relations([], {
        type: types.ADD_RELATION,
        payload: {
          relation: fixtures.relation,
        },
      })
    ).toEqual([fixtures.relation]);
  });
});
