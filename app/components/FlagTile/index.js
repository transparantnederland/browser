import './index.css';
import React, { PropTypes } from 'react';

import ConceptTile from '../ConceptTile';

const flagTypes = {
  'missing-relation': 'add',
  'duplicate': 'add',
  'wrong-type': 'edit',
};

const FlagTile = ({ flag: { type, value, author, origin, target } }) => {
  const isWrongType = type === 'wrong-type';

  return (
    <div className={['FlagTile', 'FlagTile--' + flagTypes[type]].join(' ')}>
      <div className="FlagTile-from">
        <ConceptTile concept={origin} />
      </div>
      <div className="FlagTile-type">
        <dl>
          <dt>type</dt>
          <dd>{type}</dd>
          <dt>value</dt>
          <dd>{value}</dd>
          <dt>author</dt>
          <dd>{author}</dd>
        </dl>
      </div>
      <div className="FlagTile-to">
        <ConceptTile concept={Object.assign(target, {
          type: isWrongType ? value : target.type,
        })}
        />
      </div>
    </div>
  );
};

FlagTile.propTypes = {
  flag: PropTypes.object.isRequired,
};

export default FlagTile;
