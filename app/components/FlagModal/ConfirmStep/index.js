import React, { PropTypes } from 'react';

const ConfirmStep = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
  },

  render() {
    const { flag } = this.props;

    return (
      <div>
        all good in the hood!
      </div>
    );
  },
});

export default ConfirmStep;
