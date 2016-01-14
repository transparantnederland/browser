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
        <div className="Concept-type">{(concept.type || '').replace('tnl:', '')}</div>
        <div className="Concept-dataset">{concept.datasets.join(', ')}</div>
      </div>
    );
  },
});

export default Concept;
