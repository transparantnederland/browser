import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export default reduxApi({
  from: {
    url: '/search',
    transformer: (data) => {
      return data && data.map((concept) => {
        return {
          pits: [concept[0].pit],
        };
      });
    },
  },
  to: {
    url: '/search',
    transformer: (data) => {
      return data && data.map((concept) => {
        return {
          pits: [concept[0].pit],
        };
      });
    },
  },
  relationSchema: {
    url: '/schemas/relations',
    transformer: (data) => (data),
  },
}).init(adapterFetch(fetch), fetch, __CONFIG__.api.baseUrl);
