import './index.css';
import React, { PropTypes } from 'react';

import ConceptTile from '../ConceptTile';

const flagTypes = {
  'missing-relation': 'add',
  'duplicate': 'add',
};

const FlagTile = ({ flag }) => {
  return (
    <div className={['FlagTile', 'FlagTile--' + flagTypes[flag.type]].join(' ')}>
      <div className="FlagTile-from">
        <ConceptTile concept={flag.origin} />
      </div>
      <div className="FlagTile-type">
        {flag.value}
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
