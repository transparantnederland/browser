import React, { PropTypes } from 'react';

import './index.css';

const Search = React.createClass({
  propTypes: {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  },

  render() {
    const { value, onChange } = this.props;

    return (
      <div className="Search">
        <input
          type="search"
          placeholder="Search"
          className="Search-input"
          onChange={(event) => onChange(event.target.value)}
          value={value}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus
        />
      </div>
    );
  },
});

export default Search;
