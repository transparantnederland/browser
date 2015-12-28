import React from 'react';
import { connect } from 'react-redux';

const PitView = React.createClass({
  render() {
    return (
      <div>
        <span>hello PIT</span>
      </div>
    );
  },
});

export default connect(
  (state) => (state)
)(PitView);
