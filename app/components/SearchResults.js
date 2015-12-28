import React, { PropTypes } from 'react';

const SearchResults = React.createClass({
  propTypes: {
    displayOptions: PropTypes.object.isRequired,
  },

  render() {
    const { options, selectionIndex, onOptionSelected } = this.props;

    return (
      <div>
        <ul style={{ position: 'absolute', border: '1px solid grey' }}>
          {options.map((option, index) => {
            const active = selectionIndex === index;
            return (
              <li
                style={{ background: active ? 'cyan' : 'white' }}
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
