import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import _ from 'lodash';

export default reduxApi({
  search: {
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
        datasets: _.uniq(concept.map((pit) => pit.pit.dataset)),
        // Array of pits
        pits: concept.map((pit) => pit.pit),
      })
    )),
  },
  // person: {
  //   url: '/search',
  //   transformer: (data) => {
  //     return data && data.length && data[0].map((concept) => {
  //       return concept.pit;
  //     }).shift();
  //   },
  // },
  // organization: {
  //   url: '/search',
  //   transformer: (data) => {
  //     return data && data.length && data[0].map((concept) => {
  //       return concept.pit;
  //     }).shift();
  //   },
  // },
  orgsFromPerson: {
    url: '/orgsFromPerson',
    transformer: (data) => {
      return data && data.map((concept) => (concept.shift()));
    },
  },
  // peopleFromOrg: {
  //   url: '/peopleFromOrg',
  //   transformer: (data) => {
  //     return data && data.length && data.map((concept) => {
  //       return concept.shift();
  //     });
  //   },
  // },
  // peopleFromOrgsFromPerson: {
  //   url: '/peopleFromOrgsFromPerson',
  //   transformer: (data) => {
  //     return data && data.length && data.map((concept) => {
  //       return concept.shift();
  //     });
  //   },
  // },
  // relationSchema: {
  //   url: '/schemas/relations',
  //   transformer: (data) => (data),
  // },
}).init(adapterFetch(fetch), fetch, __CONFIG__.api.baseUrl);
