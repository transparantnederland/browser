import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export default reduxApi({
  search: {
    url: '/search',
    transformer: (data) => (data),
  },
  person: {
    url: '/search',
    transformer: (data) => {
      return data && data.length && data[0].map((concept) => {
        return concept.pit;
      }).shift();
    },
  },
  organization: {
    url: '/search',
    transformer: (data) => {
      return data && data.length && data[0].map((concept) => {
        return concept.pit;
      }).shift();
    },
  },
  orgsFromPerson: {
    url: '/orgsFromPerson',
    transformer: (data) => {
      return data && data.length && data.map((concept) => {
        return concept.shift();
      });
    },
  },
  peopleFromOrg: {
    url: '/peopleFromOrg',
    transformer: (data) => {
      return data && data.length && data.map((concept) => {
        return concept.shift();
      });
    },
  },
  peopleFromOrgsFromPerson: {
    url: '/peopleFromOrgsFromPerson',
    transformer: (data) => {
      return data && data.length && data.map((concept) => {
        return concept.shift();
      });
    },
  },
  relationSchema: {
    url: '/schemas/relations',
    transformer: (data) => (data),
  },
}).init(adapterFetch(fetch), fetch, __CONFIG__.api.baseUrl);
