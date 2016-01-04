import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import api from '../../middleware/api';

import Pit from '../Pit';

const StepOne = React.createClass({
  propTypes: {
    show: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onNextClick: PropTypes.func.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      value: this.props.type || '',
    };
  },

  render() {
    const { show, onNextClick, onPreviousClick, results } = this.props;
    const { value } = this.state;

    if (!show) {
      return null;
    }

    return (
      <div>
        <div className="FlagModal-heading">Select the duplicate</div>
        <input
          type="text"
          placeholder="Search"
          className="FlagModal-input"
          onChange={this.handleInputChange}
        />
        <ul className="FlagModal-list">
          {results.map((pit) =>
            <li
              className={['FlagModal-listItem', pit.id === value ? 'FlagModal-listItem--active' : ''].join(' ')}
              key={pit.id}
              onClick={() => this.handlePitClick(pit)}
            >
              <Pit pit={pit} />
            </li>
          )}
        </ul>
        <button
          onClick={() => onPreviousClick()}
        >
          Previous
        </button>
        <button
          disabled={!value}
          onClick={() => onNextClick(value)}
        >
          Next
        </button>
      </div>
    );
  },
  handleInputChange(event) {
    const value = event.target.value;

    if (value) {
      this.props.fetchPits({
        q: value + '*',
      });
    } else {
      this.props.fetchPitsReset();
    }
  },
  handlePitClick(pit) {
    this.setState({
      value: pit.id,
    });
  },
});

export default connect(
  (state) => {
    return {
      results: state.pitSearch.data || [],
    };
  },
  {
    fetchPits: api.actions.pitSearch,
    fetchPitsReset: api.actions.pitSearch.reset,
  }
)(StepOne);
