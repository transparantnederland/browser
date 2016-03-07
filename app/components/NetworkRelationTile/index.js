import './index.css';
import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';

const RELATIONS = {
  'tnl:parent': 'Moederbedrijf van',
  'tnl:member': 'Lid van',
  'tnl:related': 'Gerelateerd aan',
  'tnl:boardmember': 'Bestuurslid van',
  'tnl:commissioner': 'Commissaris van',
  'tnl:advisor': 'Adviseur voor',
  'tnl:employee': 'Werknemer van',
  'tnl:lobbyist': 'Lobbyist voor',
};

const NetworkRelationTile = ({ relation: { pit, relation: { type, to_name } } }) => {
  return (
    <div className="NetworkRelationTile">
      <HashLink hash={pit.id}>
        <Name name={pit.name}/>
      </HashLink>
      <div className="NetworkRelationTile-body">
        {RELATIONS[type]} <Name name={to_name}/>
      </div>
    </div>
  );
};

NetworkRelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default NetworkRelationTile;
