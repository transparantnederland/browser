import React from 'react';

import './index.css';

const TypeaheadList = React.createClass({
  render() {
    const { options, selectionIndex, onOptionSelected } = this.props;

    return (
      <div className="TypeaheadList">
        <ul className="TypeaheadList-list">
          {options.map((option, index) => {
            const classNames = ['TypeaheadList-listItem'];
            if (selectionIndex === index) {
              classNames.push('TypeaheadList-listItem__active');
            }
            return (
              <li
                className={classNames.join(' ')}
                key={option.id}
                onClick={() => { onOptionSelected(option); }}
              >
                <div className="TypeaheadList-name">{option.name}</div>
                <div className="TypeaheadList-type">{option.type}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});

export default TypeaheadList;
