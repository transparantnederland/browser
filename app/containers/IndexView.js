import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

require('purecss');
require('../css/new.css');

const IndexView = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <span>hello worldd</span>
      </div>
    );
  },
});

export default connect(
  (state) => (state)
)(IndexView);
