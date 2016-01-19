import React, { PropTypes } from 'react';

import HashLink from '../HashLink';
import Name from '../Name';

const OrganizationRelationTile = ({ relation: { concept, type } }) =>
  <div>
    <HashLink hash={concept.id}>
      <Name name={concept.name}/>
    </HashLink>
    <div>
      {type}
    </div>
  </div>;

OrganizationRelationTile.propTypes = {
  relation: PropTypes.object.isRequired,
};

export default OrganizationRelationTile;
