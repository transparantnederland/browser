import React, { PropTypes } from 'react';

const FLAGS = [
  { type: 'duplicate', title: 'Mark as duplicate' },
  { type: 'missing-relation', title: 'Add missing relation' },
];

const StepOne = React.createClass({
  propTypes: {
    flag: PropTypes.shape({
      pit: PropTypes.object,
      type: PropTypes.string,
      value: PropTypes.object,
    }).isRequired,
    onFlagChange: PropTypes.func.isRequired,
  },

  render() {
    const { flag, onFlagChange } = this.props;

    return (
      <div>
        <div className="FlagModal-heading">What do you want to do?</div>
        {FLAGS.map((row) =>
          <div
            className="FlagModal-radioGroup"
            key={row.type}
          >
            <label onClick={() => onFlagChange({ type: row.type })}>
              <input
                type="radio"
                name="flag"
                value={row.type}
                defaultChecked={row.type === flag.type}
              />
              <span>{row.title}</span>
            </label>
          </div>
        )}
      </div>
    );
  },
});

export default StepOne;
