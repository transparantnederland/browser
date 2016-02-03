import expect from 'expect';
import flag from '../../reducers/flag';
import * as types from '../../actions/flag';

describe('flag reducer', () => {
  it('should handle initial state', () => {
    expect(
      flag(undefined, {})
    ).toEqual(null);
  });

  it('should handle ADD_RELATION', () => {
    expect(
      flag(undefined, {
        type: types.ADD_RELATION,
        payload: {
          source: {},
          target: {},
        },
      })
    ).toEqual({
      concept: {},
      type: 'missing-relation',
      value: {
        concept: {},
        type: 'tnl:same',
      },
    });
  });

  it('should handle RESET_FLAG', () => {
    expect(
      flag({
        concept: {},
        type: 'duplicate',
        value: {},
      }, {
        type: types.RESET_FLAG,
        payload: null,
      })
    ).toEqual(null);
  });
});
