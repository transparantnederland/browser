import expect from 'expect';

import person from '../fixtures/person.json';
import organization from '../fixtures/organization.json';
import publicOrganization from '../fixtures/organization-public.json';
import sector from '../fixtures/sector.json';
import * as actions from '../../actions/flag';

describe('relations actions', () => {
  describe('addRelation', () => {
    it('should create an organization to organization ADD_FLAG action', () => {
      expect(actions.addRelation(organization, organization)).toEqual({
        type: actions.ADD_FLAG,
        payload: {
          concept: organization,
          type: 'missing-relation',
          value: {
            concept: organization,
            type: 'tnl:same',
          },
        },
      });
    });

    it('should create a person to organization ADD_FLAG action', () => {
      expect(actions.addRelation(person, organization)).toEqual({
        type: actions.ADD_FLAG,
        payload: {
          concept: person,
          type: 'missing-relation',
          value: {
            concept: organization,
            type: 'tnl:member',
          },
        },
      });
    });

    it('should create a person to person ADD_FLAG action', () => {
      expect(actions.addRelation(person, person)).toEqual({
        type: actions.ADD_FLAG,
        payload: {
          concept: person,
          type: 'missing-relation',
          value: {
            concept: person,
            type: 'tnl:same',
          },
        },
      });
    });

    it('should create an organization to person ADD_FLAG action', () => {
      expect(actions.addRelation(organization, person)).toEqual({
        type: actions.ADD_FLAG,
        payload: {
          concept: person,
          type: 'missing-relation',
          value: {
            concept: organization,
            type: 'tnl:member',
          },
        },
      });
    });

    it('should create an organization to public organization ADD_FLAG action', () => {
      expect(actions.addRelation(organization, publicOrganization)).toEqual({
        type: actions.ADD_FLAG,
        payload: {
          concept: organization,
          type: 'missing-relation',
          value: {
            concept: publicOrganization,
            type: 'tnl:same',
          },
        },
      });
    });

    it('should create an organization to sector ADD_FLAG action', () => {
      expect(actions.addRelation(organization, sector)).toEqual({
        type: actions.ADD_FLAG,
        payload: {
          concept: organization,
          type: 'missing-relation',
          value: {
            concept: sector,
            type: 'tnl:related',
          },
        },
      });
    });

    it('should create a sector to organization ADD_FLAG action', () => {
      expect(actions.addRelation(sector, organization)).toEqual({
        type: actions.ADD_FLAG,
        payload: {
          concept: organization,
          type: 'missing-relation',
          value: {
            concept: sector,
            type: 'tnl:related',
          },
        },
      });
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
