import React, { PropTypes } from 'react';

import './index.css';

const SearchResults = React.createClass({
  propTypes: {
    displayOptions: PropTypes.object.isRequired,
  },

  render() {
    const { options, selectionIndex, onOptionSelected } = this.props;

    return (
      <div className="SearchResults">
        <ul className="SearchResults-list">
          {options.map((option, index) => {
            const classNames = ['SearchResults-listItem'];
            if (selectionIndex === index) {
              classNames.push('SearchResults-listItem__active');
            }
            return (
              <li
                className={classNames.join(' ')}
                key={option.id}
                onClick={() => { onOptionSelected(option); }}
              >
                {option.name}
                {option.type}
              </li>);
          })}
        </ul>
      </div>
    );
  },
});

export default SearchResults;
