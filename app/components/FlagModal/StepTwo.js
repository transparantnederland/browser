import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import api from '../../utils/api';

import Pit from '../Pit';

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
    const { flag, results } = this.props;

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
              className={['FlagModal-listItem', pit.id === (flag.value && flag.value.pit.id) ? 'FlagModal-listItem--active' : ''].join(' ')}
              key={pit.id}
              onClick={() => this.handlePitClick(pit)}
            >
              <Pit pit={pit} />
            </li>
          )}
        </ul>
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
    this.props.onFlagChange({
      value: {
        pit,
        type: 'tnl:same',
      },
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
