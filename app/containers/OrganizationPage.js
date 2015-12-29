import React from 'react';
import { connect } from 'react-redux';

import api from './../middleware/api';

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
        {peopleFromOrg.map((item) => {
          return (
            <div>
              <h3>{item.relation_type} of {item.pit.name}</h3>
              <span>{item.pit.dataset}</span>
            </div>
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
