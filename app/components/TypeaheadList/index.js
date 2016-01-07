import React from 'react';

import Concept from '../Concept';

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
                <Concept concept={option}/>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});

export default TypeaheadList;
