import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { pitToPath, personRelation, organizationRelation } from '../../lib/helpers';

const RelationCard = React.createClass({
  propTypes: {
    from: PropTypes.object.isRequired,
    relation: PropTypes.string.isRequired,
    to: PropTypes.object.isRequired,
  },

  render() {
    const { from, relation, to } = this.props;
    const isPerson = to.type === 'tnl:Person';
    const relationString = isPerson ? personRelation : organizationRelation;
    const relationLink = isPerson ? <Link to={pitToPath(from)}>{from.name}</Link> : null;

    return (
      <div className="RelationCard">
        <h3><Link to={pitToPath(to)}>{to.name}</Link></h3>
        <div>{relationString(relation)} {relationLink}</div>
        <span>Source: {to.dataset}</span>
      </div>
    );
  },
});

export default RelationCard;
