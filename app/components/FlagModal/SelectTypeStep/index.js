import React, { PropTypes } from 'react';

const FLAGS = [
  { type: 'duplicate', title: 'is a duplicate' },
  { type: 'missing-relation', title: 'is missing a relation' },
  { type: 'wrong-type', title: 'has the wrong type' },
];

import Type from '../../Type';

const SelectTypeStep = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  render() {
    const { flag, onSelect } = this.props;

    return (
      <div>
        <span>This <Type type={flag.concept.type} />&hellip;</span>
        {FLAGS.map((row) =>
          <div key={row.type}>
            <label>
              <input
                type="radio"
                name="flag"
                value={row.type}
                onChange={() => onSelect(row.type)}
                defaultChecked={row.type === flag.type}
              />&nbsp;
              <span>{row.title}</span>
            </label>
          </div>
        )}
      </div>
    );
  },
});

export default SelectTypeStep;
