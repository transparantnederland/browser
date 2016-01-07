import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export default reduxApi({
  flag: {
    url: '/flags',
    // validation: (data, callback) => {
    //   // let error;
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
}).init(adapterFetch(fetch), fetch);
