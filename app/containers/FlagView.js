import React from 'react';
import { connect } from 'react-redux';

import admin from '../utils/admin';

import Concept from '../components/Concept';

const FlagView = React.createClass({
  componentWillMount() {
    this.props.fetchFlags();
  },

  render() {
    const { flags } = this.props;

    return (
      <div className="FlagView">
        {flags.map((flag) =>
          <div style={{ borderBottom: '1px solid #ccc' }} key={flag.id}>
            <Concept concept={flag.origin}/>
            {flag.type} ({flag.value})
            <Concept concept={flag.target}/>
          </div>
        )}
      </div>
    );
  },
});

export default connect(
  (state) => {
    const { data: { flags } } = state;

    return {
      flags: flags.data,
    };
  },
  {
    fetchFlags: admin.actions.flags,
  }
)(FlagView);
