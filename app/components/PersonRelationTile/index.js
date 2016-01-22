import './index.css';
import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';
import RelationPeriod from '../RelationPeriod';

const RELATIONS = {
  'tnl:member': 'Member of ',
  'tnl:boardmember': 'Board member of ',
  'tnl:commissioner': 'Commissioner of ',
  'tnl:advisor': 'Advisor for ',
  'tnl:employee': 'Employee of ',
  'tnl:lobbyist': 'Lobbyist for ',
};

const PersonRelationTile = ({ relation: { concept, relation: { type, since, until } } }) => {
  return (
    <div className="PersonRelationTile">
      <div className="PersonRelationTile-heading">
        {RELATIONS[type]}
        <HashLink hash={concept.id}>
          <Name name={concept.name}/>
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
