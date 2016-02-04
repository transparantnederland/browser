import expect from 'expect';
import flag from '../../reducers/flag';
import * as types from '../../actions/flag';

describe('flag reducer', () => {
  describe('INIT', () => {
    it('should handle initial state', () => {
      expect(
        flag(undefined, {})
      ).toEqual(null);
    });
  });

  describe('ADD_FLAG', () => {
    it('should handle ADD_FLAG', () => {
      expect(
        flag(undefined, {
          type: types.ADD_FLAG,
          payload: {
            concept: {},
            type: '',
            value: {},
          },
        })
      ).toEqual({
        concept: {},
        type: '',
        value: {},
      });
    });
  });

  describe('UPDATE_FLAG', () => {
    it('should handle UPDATE_FLAG value object update', () => {
      expect(
        flag({
          concept: {},
          type: '',
          value: {
            concept: {},
            type: 'tnl:same',
          },
        }, {
          type: types.UPDATE_FLAG,
          payload: {
            value: {
              type: 'tnl:member',
            },
          },
        })
      ).toEqual({
        concept: {},
        type: '',
        value: {
          concept: {},
          type: 'tnl:member',
        },
      });
    });
  });

  describe('RESET_FLAG', () => {
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
});
