import './index.css';
import React, { PropTypes } from 'react';

import ConceptTile from '../ConceptTile';

const FlagTile = ({ flag }) => {
  return (
    <div className="FlagTile">
      <div className="FlagTile-from">
        <ConceptTile concept={flag.origin} />
      </div>
      <div className="FlagTile-type">
        {flag.type}
      </div>
      <div className="FlagTile-to">
        <ConceptTile concept={flag.target} />
      </div>
    </div>
  );
};

FlagTile.propTypes = {
  flag: PropTypes.object.isRequired,
};

export default FlagTile;
