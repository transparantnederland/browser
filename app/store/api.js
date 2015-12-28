import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export default reduxApi({
  search: {
    url: '/search',
    transformer: (data) => (data),
  },
  from: {
    url: '/search',
    transformer: (data) => (data),
  },
  to: {
    url: '/search',
    transformer: (data) => (data),
  },
  relationSchema: {
    url: '/schemas/relations',
    transformer: (data) => (data),
  },
}).init(adapterFetch(fetch), fetch, __CONFIG__.api.baseUrl);
