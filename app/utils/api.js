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
    transformers.array(data).map((concept) => {
      return _.isArray(concept) ? concept[0] : concept;
    })
  ),
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
    url: '/relations',
    transformer: apiTransformers.relationArray,
  },
  peopleFromOrg: {
    url: '/relations',
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
