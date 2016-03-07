import './index.css';
import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';
import RelationPeriod from '../RelationPeriod';

const PersonRelationTile = ({ relation: { pit, relation: { since, until } } }) => {
  return (
    <div className="PersonRelationTile">
      <div className="PersonRelationTile-heading">
        <HashLink hash={pit.id}>
          <Name name={pit.name}/>
        </HashLink>
      </div>
      <div className="PersonRelationTile-body">
        {since ? <RelationPeriod since={since} until={until} /> : null}
      </div>
    </div>
  );
};

PersonRelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default PersonRelationTile;
