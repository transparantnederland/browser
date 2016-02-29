import './index.css';
import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';
import RelationPeriod from '../RelationPeriod';

const RELATIONS = {
  'tnl:parent': 'Moederbedrijf',
  'tnl:member': 'Lid',
  'tnl:related': 'Gerelateerd',
  'tnl:boardmember': 'Bestuurslid',
  'tnl:commissioner': 'Commissaris',
  'tnl:advisor': 'Adviseur',
  'tnl:employee': 'Werknemer',
  'tnl:lobbyist': 'Lobbyist',
};

const OrganizationRelationTile = ({ relation: { concept, relation: { type, since, until } } }) => {
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

OrganizationRelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default OrganizationRelationTile;
