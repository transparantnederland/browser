import React, { PropTypes } from 'react';

import './index.css';

const Concept = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
  },

  render() {
    const { concept } = this.props;

    return (
      <div className="Concept">
        <div className="Concept-name">{concept.name}</div>
        <div className="Concept-type">{concept.type}</div>
        <div className="Concept-dataset">Source: {concept.datasets.join(', ')}</div>
      </div>
    );
  },
});

export default Concept;
