import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';

const RELATIONS = {
  'tnl:parent': 'Parent Company',
  'tnl:member': 'Member',
  'tnl:boardmember': 'Board member',
  'tnl:commissioner': 'Commissioner',
  'tnl:advisor': 'Advisor',
  'tnl:employee': 'Employee',
  'tnl:lobbyist': 'Lobbyist',
};

const RelationTile = ({ relation: { concept, type } }) =>
  <div>
    <HashLink hash={concept.id}>
      <Name name={concept.name}/>
    </HashLink>
    <div>
      {RELATIONS[type]}
    </div>
  </div>;

RelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default RelationTile;
