import './index.css';
import React, { PropTypes } from 'react';

import ConceptTile from '../ConceptTile';
import Button from '../Button';

const flagTypes = {
  'missing-relation': 'add',
  'duplicate': 'add',
  'wrong-type': 'edit',
};

const FlagTile = ({ flag: { id, author, type, origin, value, target }, onApprove }) => {
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
      <div className="FlagTile-actions">
        <Button type="primary" onClick={() => onApprove(id)}>Approve</Button>
      </div>
    </div>
  );
};

FlagTile.propTypes = {
  flag: PropTypes.object.isRequired,
  onApprove: PropTypes.func.isRequired,
};

export default FlagTile;
