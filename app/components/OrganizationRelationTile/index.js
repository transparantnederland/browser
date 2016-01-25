import './index.css';
import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';
import RelationPeriod from '../RelationPeriod';

const RELATIONS = {
  'tnl:parent': 'Parent Company',
  'tnl:member': 'Member',
  'tnl:related': 'Related',
  'tnl:boardmember': 'Board member',
  'tnl:commissioner': 'Commissioner',
  'tnl:advisor': 'Advisor',
  'tnl:employee': 'Employee',
  'tnl:lobbyist': 'Lobbyist',
};

const RelationTile = ({ relation: { concept, relation: { type, since, until } } }) => {
  return (
    <div className="OrganizationRelationTile">
      <HashLink hash={concept.id}>
        <Name name={concept.name}/>
      </HashLink> ({RELATIONS[type]})
      <div className="OrganizationRelationTile-body">
        {since ? <RelationPeriod since={since} until={until} /> : null}
      </div>
    </div>
  );
};

RelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default RelationTile;
