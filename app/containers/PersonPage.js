import React from 'react';
import { connect } from 'react-redux';

import api from './../middleware/api';

import RelationCard from './../components/RelationCard';

function loadData(props) {
  const { id } = props;

  props.fetchPerson({ id });
  props.fetchOrgsFromPerson({ id });
  props.fetchPeopleFromOrgsFromPerson({ id });
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
    const { person, orgsFromPerson, peopleFromOrgsFromPerson } = this.props;

    if (!person || !orgsFromPerson || !peopleFromOrgsFromPerson) {
      return null;
    }

    return (
      <div>
        <h1>{person.name}</h1>
        <div>{person.id}</div>
        <div>{person.type}</div>
        <div>{person.dataset}</div>
        {orgsFromPerson.map((item) => {
          const { pit } = item;

          return (
            <RelationCard
              key={pit.id}
              from={person}
              relation={item.relation_type}
              to={pit}
            />
          );
        })}
        <h2>Similar people</h2>
        {peopleFromOrgsFromPerson.slice(0, 10).map((item) => {
          const { pit } = item;

          return (
            <RelationCard
              key={pit.id}
              from={item.relation_org}
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
    const { person, orgsFromPerson, peopleFromOrgsFromPerson } = state;

    return {
      id: [dataset, id].join('/'),
      person: person.data,
      orgsFromPerson: orgsFromPerson.data,
      peopleFromOrgsFromPerson: peopleFromOrgsFromPerson.data,
    };
  },
  {
    fetchPerson: api.actions.person,
    fetchOrgsFromPerson: api.actions.orgsFromPerson,
    fetchPeopleFromOrgsFromPerson: api.actions.peopleFromOrgsFromPerson,
  }
)(PersonPage);
