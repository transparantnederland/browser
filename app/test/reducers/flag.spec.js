import expect from 'expect';
import flag from '../../reducers/flag';
import * as types from '../../actions/flag';

describe('flag reducer', () => {
  it('should handle initial state', () => {
    expect(
      flag(undefined, {})
    ).toEqual({
      concept: null,
      type: null,
      value: null,
    });
  });

  it('should handle SET_CONCEPT', () => {
    expect(
      flag(undefined, {
        type: types.SET_CONCEPT,
        payload: {
          concept: {},
        },
      })
    ).toEqual({
      concept: {},
      type: null,
      value: null,
    });
  });

  it('should handle SET_TYPE', () => {
    expect(
      flag(undefined, {
        type: types.SET_TYPE,
        payload: {
          type: 'duplicate',
        },
      })
    ).toEqual({
      concept: null,
      type: 'duplicate',
      value: null,
    });
  });

  it('should handle SET_VALUE', () => {
    expect(
      flag(undefined, {
        type: types.SET_VALUE,
        payload: {
          value: {},
        },
      })
    ).toEqual({
      concept: null,
      type: null,
      value: {},
    });
  });
});
