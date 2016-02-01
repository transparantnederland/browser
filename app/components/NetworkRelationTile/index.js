import './index.css';
import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';

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

const NetworkRelationTile = ({ relation: { concept, relation: { type, to } } }) => {
  return (
    <div className="NetworkRelationTile">
      <HashLink hash={concept.id}>
        <Name name={concept.name}/>
      </HashLink>
      <div className="NetworkRelationTile-body">
        {RELATIONS[type]} of <Name name={to.name}/>
      </div>
    </div>
  );
};

NetworkRelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default NetworkRelationTile;
