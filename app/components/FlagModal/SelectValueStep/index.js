import React, { PropTypes } from 'react';

const SelectValueStep = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  render() {
    const { flag, onSelect } = this.props;

    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          className="FlagModal-input"

        />
      </div>
    );
  },
});

export default SelectValueStep;
