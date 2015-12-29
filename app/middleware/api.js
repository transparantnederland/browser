import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export default reduxApi({
  search: {
    url: '/search',
    transformer: (data) => (data),
  },
  pit: {
    url: '/search',
    transformer: (data) => (data),
  },
  relationSchema: {
    url: '/schemas/relations',
    transformer: (data) => (data),
  },
}).init(adapterFetch(fetch), fetch, __CONFIG__.api.baseUrl);
