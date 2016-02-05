import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import person from '../fixtures/person.json';
import organization from '../fixtures/organization.json';
import publicOrganization from '../fixtures/organization-public.json';
import sector from '../fixtures/sector.json';
import * as actions from '../../actions/flag';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const defaultState = {
  data: {
    relationTypes: {
      data: [
        'tnl:same',
        'tnl:parent',
        'tnl:related',
        'tnl:member',
        'tnl:boardmember',
        'tnl:commissioner',
        'tnl:advisor',
        'tnl:employee',
        'tnl:lobbyist',
      ],
    },
  },
};

describe('relations actions', () => {
  describe('addRelation', () => {
    it('should create an organization to organization ADD_FLAG action', (done) => {
      const getState = defaultState;
      const action = {
        type: actions.ADD_FLAG,
        payload: {
          concept: organization,
          type: 'missing-relation',
          value: {
            concept: organization,
            type: 'tnl:same',
          },
          meta: {
            relationOptions: [
              'tnl:same',
              'tnl:parent',
            ],
            canToggle: true,
          },
        },
      };
      const expectedActions = [action];

      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.addRelation(organization, organization));
    });

    it('should create a person to organization ADD_FLAG action', (done) => {
      const getState = defaultState;
      const action = {
        type: actions.ADD_FLAG,
        payload: {
          concept: person,
          type: 'missing-relation',
          value: {
            concept: organization,
            type: 'tnl:member',
          },
          meta: {
            relationOptions: [
              'tnl:related',
              'tnl:member',
              'tnl:boardmember',
              'tnl:commissioner',
              'tnl:advisor',
              'tnl:employee',
              'tnl:lobbyist',
            ],
            canToggle: false,
          },
        },
      };
      const expectedActions = [action];

      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.addRelation(person, organization));
    });

    it('should create a person to person ADD_FLAG action', (done) => {
      const getState = defaultState;
      const action = {
        type: actions.ADD_FLAG,
        payload: {
          concept: person,
          type: 'missing-relation',
          value: {
            concept: person,
            type: 'tnl:same',
          },
          meta: {
            relationOptions: [
              'tnl:same',
            ],
            canToggle: false,
          },
        },
      };
      const expectedActions = [action];

      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.addRelation(person, person));
    });

    it('should create an organization to person ADD_FLAG action', (done) => {
      const getState = defaultState;
      const action = {
        type: actions.ADD_FLAG,
        payload: {
          concept: person,
          type: 'missing-relation',
          value: {
            concept: organization,
            type: 'tnl:member',
          },
          meta: {
            relationOptions: [
              'tnl:related',
              'tnl:member',
              'tnl:boardmember',
              'tnl:commissioner',
              'tnl:advisor',
              'tnl:employee',
              'tnl:lobbyist',
            ],
            canToggle: false,
          },
        },
      };
      const expectedActions = [action];

      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.addRelation(organization, person));
    });

    it('should create an organization to public organization ADD_FLAG action', (done) => {
      const getState = defaultState;
      const action = {
        type: actions.ADD_FLAG,
        payload: {
          concept: organization,
          type: 'missing-relation',
          value: {
            concept: publicOrganization,
            type: 'tnl:same',
          },
          meta: {
            relationOptions: [
              'tnl:same',
              'tnl:parent',
            ],
            canToggle: true,
          },
        },
      };
      const expectedActions = [action];

      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.addRelation(organization, publicOrganization));
    });

    it('should create an organization to sector ADD_FLAG action', (done) => {
      const getState = defaultState;
      const action = {
        type: actions.ADD_FLAG,
        payload: {
          concept: organization,
          type: 'missing-relation',
          value: {
            concept: sector,
            type: 'tnl:related',
          },
          meta: {
            relationOptions: [
              'tnl:related',
            ],
            canToggle: false,
          },
        },
      };
      const expectedActions = [action];

      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.addRelation(organization, sector));
    });

    it('should create a sector to organization ADD_FLAG action', (done) => {
      const getState = defaultState;
      const action = {
        type: actions.ADD_FLAG,
        payload: {
          concept: organization,
          type: 'missing-relation',
          value: {
            concept: sector,
            type: 'tnl:related',
          },
          meta: {
            relationOptions: [
              'tnl:related',
            ],
            canToggle: false,
          },
        },
      };
      const expectedActions = [action];

      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.addRelation(sector, organization));
    });
  });

  describe('updateRelationType', () => {
    it('should create an UPDATE_FLAG action', () => {
      expect(actions.updateRelationType('tnl:member')).toEqual({
        type: actions.UPDATE_FLAG,
        payload: {
          value: {
            type: 'tnl:member',
          },
        },
      });
    });
  });
});
