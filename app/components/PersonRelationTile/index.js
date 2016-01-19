import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';

const RELATIONS = {
  'tnl:member': 'Member of ',
  'tnl:boardmember': 'Board member of ',
  'tnl:commissioner': 'Commissioner of ',
  'tnl:advisor': 'Advisor for ',
  'tnl:employee': 'Employee of ',
  'tnl:lobbyist': 'Lobbyist for ',
};

const PersonRelationTile = ({ relation: { concept, type } }) =>
  <div>
    {RELATIONS[type]}
    <HashLink hash={concept.id}>
      <Name name={concept.name}/>
    </HashLink>
  </div>;

PersonRelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default PersonRelationTile;
