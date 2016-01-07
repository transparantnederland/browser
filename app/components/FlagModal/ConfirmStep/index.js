import React, { PropTypes } from 'react';

import Concept from '../../Concept';

const ConfirmStep = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
  },

  render() {
    const { flag } = this.props;

    return (
      <div>
        <Concept concept={flag.concept}/>
        {flag.type} ({flag.value.type})
        <Concept concept={flag.value.concept}/>
      </div>
    );
  },
});

export default ConfirmStep;
