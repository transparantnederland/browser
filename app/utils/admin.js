import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export default reduxApi({
  flag: {
    url: '/flags',
    // validation: (data, callback) => {
    //   debugger;
    // },
    options: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  },
  flags: {
    url: '/flags.json',
    transformer: transformers.array,
  },
}).init(adapterFetch(fetch), fetch);
