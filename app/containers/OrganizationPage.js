import React from 'react';
import { connect } from 'react-redux';

import api from './../middleware/api';

import RelationCard from './../components/RelationCard';

function loadData(props) {
  const { id } = props;

  props.fetchOrganization({ id });
  props.fetchPeopleFromOrg({ id });
}

const OrganizationPage = React.createClass({
  componentWillMount() {
    loadData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      loadData(nextProps);
    }
  },

  render() {
    const { organization, peopleFromOrg } = this.props;

    if (!organization || !peopleFromOrg) {
      return null;
    }

    return (
      <div>
        <h1>{organization.name}</h1>
        <div>{organization.id}</div>
        <div>{organization.type}</div>
        <div>{organization.dataset}</div>
        <h2>Related politicians</h2>
        {peopleFromOrg.map((item) => {
          const { pit } = item;

          return (
            <RelationCard
              key={pit.id}
              from={organization}
              relation={item.relation_type}
              to={pit}
            />
          );
        })}
      </div>
    );
  },
});


export default connect(
  (state) => {
    const { dataset, id } = state.router.params;
    const { organization, peopleFromOrg } = state;

    return {
      id: [dataset, id].join('/'),
      organization: organization.data,
      peopleFromOrg: peopleFromOrg.data,
    };
  },
  {
    fetchOrganization: api.actions.organization,
    fetchPeopleFromOrg: api.actions.peopleFromOrg,
  }
)(OrganizationPage);
