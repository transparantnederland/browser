import React, { PropTypes } from 'react';

import Pit from '../Pit/';

const StepThree = React.createClass({
  propTypes: {
    flag: PropTypes.shape({
      pit: PropTypes.object,
      type: PropTypes.string,
      value: PropTypes.object,
    }).isRequired,
  },

  render() {
    const { flag } = this.props;

    return (
      <div>
        <div className="FlagModal-heading">Is this correct?</div>
        <Pit pit={flag.pit} />
        <div>{flag.type} {flag.value.type}</div>
        <Pit pit={flag.value.pit} />
      </div>
    );
  },
});

export default StepThree;
