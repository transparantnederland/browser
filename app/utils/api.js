import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import _ from 'lodash';

export default reduxApi({
  concepts: {
    url: '/search',
    transformer: (data) => (
      transformers.array(data).map((concept) => ({
        // Id of first pit
        id: concept[0].pit.id,
        // Type of first pit
        type: concept[0].pit.type,
        // Name of first valid pit
        name: _.uniq(concept.map((pit) => pit.pit.name)).shift(),
        // Array of datasets
        datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
        // Array of pits
        pits: concept.map((pit) => pit.pit),
      })
    )),
  },
  pitSearch: {
    url: '/search',
    transformer: (data) => (
      data && data.map((concept) => ({
        // Id of first pit
        id: concept[0].pit.id,
        // Type of first pit
        type: concept[0].pit.type,
        // Name of first valid pit
        name: _.uniq(concept.map((pit) => pit.pit.name)).shift(),
        // Array of datasets
        dataset: concept[0].pit.dataset,
      })
    )),
  },
  orgsFromPerson: {
    url: '/orgsFromPerson',
    transformer: (data) => {
      return data && data.map((concept) => (concept.shift()));
    },
  },
  types: {
    url: '/schemas/pits',
    transformer: (data) => (transformers.array(data && data.properties.type.enum)),
  },
  datasets: {
    url: '/datasets',
    transformer: (data) => (transformers.array(data)),
  },
}).init(adapterFetch(fetch), fetch, __CONFIG__.api.baseUrl);
