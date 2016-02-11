import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const admin = reduxApi({
  flag: {
    url: '/api/flags',
    options: {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
    postfetch: [
      function ({ actions, dispatch }) {
        dispatch(actions.flags.sync());
      },
    ],
  },
  approveFlag: {
    url: '/api/flags/:id/approve',
    options: {
      method: 'PUT',
      credentials: 'same-origin',
    },
    postfetch: [
      function ({ actions, dispatch }) {
        dispatch(actions.flags.sync());
      },
    ],
  },
  flags: {
    url: '/api/flags',
    transformer: transformers.array,
    options: {
      credentials: 'same-origin',
    },
  },
});
admin.use('fetch', adapterFetch(fetch));

export default admin;
