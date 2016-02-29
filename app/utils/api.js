import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import _ from 'lodash';

const apiTransformers = {
  concept: (data) => (
    transformers.array(data).map((concept) => ({
      // Id of first pit
      id: concept[0].pit.id,
      // Type of first pit
      type: concept[0].pit.type || '',
      // Name of first valid pit
      name: _.uniq(concept.map((pit) => pit.pit.name)).shift() || '',
      // Array of datasets
      datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
      // NOTE: This logic should probably happen on the API
      // Array of pits | filtered by one per dataset
      pits: concept.map((pit) => pit.pit),
    })).shift() || null
  ),
  conceptArray: (data) => (
    transformers.array(data).map((concept) => ({
      // Id of first pit
      id: concept[0].pit.id,
      // Type of first pit
      type: concept[0].pit.type || '',
      // Name of first valid pit
      name: _.uniq(concept.map((pit) => pit.pit.name)).shift() || '',
      // Array of datasets
      datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
    })
  )),
  relationArray: (data) => (
    transformers.array(data).map((concept) => ({
      // Type of first valid relation
      // TODO: see if we can move this sanity check to the API
      relation: concept
        .filter((relation) => relation.relation && relation.relation.type)
        .map((relation) => Object.assign(relation.relation, {
          to: relation.relation_org || relation.relation.to,
        }))
        .shift(),
      concept: {
        // Id of first pit
        id: concept[0].pit.id,
        // Type of first pit
        type: concept[0].pit.type,
        // Name of first valid pit
        name: _.uniq(concept.map((pit) => pit.pit.name)).shift(),
        // Array of datasets
        datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
        // Array of pits
        to: concept.filter((relation) => relation.relation && relation.relation.type)
          .map((pit) => pit.pit)
          .shift(),
      },
    })
  )),
};

const api = reduxApi({
  concepts: {
    url: '/search',
    transformer: apiTransformers.conceptArray,
  },
  concept: {
    url: '/search',
    transformer: apiTransformers.concept,
  },
  search: {
    url: '/search',
    transformer: apiTransformers.conceptArray,
  },
  orgsFromPerson: {
    url: '/orgsFromPerson',
    transformer: apiTransformers.relationArray,
  },
  peopleFromOrg: {
    url: '/peopleFromOrg',
    transformer: apiTransformers.relationArray,
  },
  peopleFromOrgsFromPerson: {
    url: 'peopleFromOrgsFromPerson',
    transformer: apiTransformers.relationArray,
  },
  relationTypes: {
    url: '/schemas/relations',
    transformer: (data) => (transformers.array(data && data.properties.type.enum)),
  },
  types: {
    url: '/schemas/pits',
    transformer: (data) => (transformers.array(data && data.properties.type.enum)),
  },
  datasets: {
    url: '/datasets',
    transformer: (data) => (transformers.array(data)),
  },
});
api.use('fetch', adapterFetch(fetch));
api.use('rootUrl', __CONFIG__.api.baseUrl);

export default api;
