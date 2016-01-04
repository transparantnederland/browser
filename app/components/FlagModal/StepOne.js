import React, { PropTypes } from 'react';

const FLAGS = [
  { type: 'duplicate', title: 'Duplicate' },
  { type: 'missing-relation', title: 'Missing relation' },
  { type: 'invalid-relation', title: 'Bad or wrong relation', disabled: true },
  { type: 'invalid-type', title: 'Wrong type', disabled: true },
];

const StepOne = React.createClass({
  propTypes: {
    show: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onNextClick: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      value: this.props.value || '',
    };
  },

  render() {
    const { show, onNextClick } = this.props;
    const { value } = this.state;

    if (!show) {
      return null;
    }

    return (
      <div>
        <div className="FlagModal-heading">What is wrong with this PIT?</div>
        {FLAGS.map((flag) =>
          <div
            className={['FlagModal-radioGroup', flag.disabled ? 'FlagModal-radioGroup--disabled' : ''].join(' ')}
            key={flag.type}
          >
            <label onClick={() => this.setState({ value: flag.type })}>
              <input
                type="radio"
                name="flag"
                value={flag.type}
                defaultChecked={flag.type === value}
                disabled={flag.disabled}
              />
              <span>{flag.title}</span>
            </label>
          </div>
        )}
        <button
          type="submit"
          disabled={!value}
          onClick={() => onNextClick(value)}
        >
          Next
        </button>
      </div>
    );
  },
});

export default StepOne;
