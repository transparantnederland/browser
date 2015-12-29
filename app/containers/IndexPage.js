import React from 'react';
import { connect } from 'react-redux';

const IndexPage = React.createClass({
  render() {
    return (
      <div>
        <span>hello index</span>
      </div>
    );
  },
});

export default connect(
  (state) => (state)
)(IndexPage);
