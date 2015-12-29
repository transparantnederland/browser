import React, { PropTypes } from 'react';

import { typeToText } from './../../lib/helpers';

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
                <div className="SearchResults-name">{option.name}</div>
                <div className="SearchResults-type">{typeToText(option.type)}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});

export default SearchResults;
