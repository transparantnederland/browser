import React, { PropTypes } from 'react';

import Concept from './../Concept';

import './index.css';

const ConceptList = React.createClass({
  propTypes: {
    concepts: PropTypes.array.isRequired,
    onConceptSelect: PropTypes.func.isRequired,
  },

  render() {
    const { concepts, selected } = this.props;

    return (
      <ul className="List">
        {concepts.map((concept) =>
          <li
            className={['List-item', selected && concept.id === selected.id ? 'List-item--active' : ''].join(' ')}
            key={concept.id}
            onClick={() => this.props.onConceptSelect(concept)}
          >
            <Concept concept={concept}/>
          </li>
        )}
      </ul>
    );
  },
});

export default ConceptList;
