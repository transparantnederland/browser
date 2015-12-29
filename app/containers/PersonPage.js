import React from 'react';
import { connect } from 'react-redux';

import api from './../middleware/api';

function loadData(props) {
  const { id } = props;

  props.fetchPerson({ id });
  props.fetchOrgsFromPerson({ id });
}

const PersonPage = React.createClass({
  componentWillMount() {
    loadData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      loadData(nextProps);
    }
  },

  render() {
    const { person, orgsFromPerson } = this.props;

    if (!person || !orgsFromPerson) {
      return null;
    }

    return (
      <div>
        <h1>{person.name}</h1>
        <div>{person.id}</div>
        <div>{person.type}</div>
        <div>{person.dataset}</div>
        {orgsFromPerson.map((item) => {
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
    const { person, orgsFromPerson } = state;

    return {
      id: [dataset, id].join('/'),
      person: person.data,
      orgsFromPerson: orgsFromPerson.data,
    };
  },
  {
    fetchPerson: api.actions.person,
    fetchOrgsFromPerson: api.actions.orgsFromPerson,
  }
)(PersonPage);
