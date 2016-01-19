import React, { PropTypes } from 'react';

import './index.css';

const Search = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
  },

  render() {
    return (
      <div className="Search">
        <input
          type="search"
          placeholder="Search"
          className="Search-input"
          onChange={(event) => this.props.onChange(event.target.value)}
          autoFocus
        />
      </div>
    );
  },
});

export default Search;
