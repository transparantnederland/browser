import './index.css';
import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';
import Type from '../Type';
import RelationPeriod from '../RelationPeriod';

const RelationTile = ({ relation: { pit, relation: { since, until } } }) => {
  return (
    <div className="RelationTile">
      <div className="RelationTile-heading">
        <HashLink hash={pit.id}>
          <Name name={pit.name}/>
        </HashLink>
      </div>
      <div className="RelationTile-body">
        <Type type={pit.type}/><br/>
        {since ? <RelationPeriod since={since} until={until}/> : null}
      </div>
    </div>
  );
};

RelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default RelationTile;
