import React from 'react';
import { connect } from 'react-redux';

import api from '../utils/api';
import admin from '../utils/admin';

import ConceptDropTarget from '../components/ConceptDropTarget';
import Detail from '../components/Detail';

function loadData(props) {
  const { id } = props;

  if (id) {
    props.dispatch(api.actions.concept({ id }));
    props.dispatch(admin.actions.flags({ concept: id }));
  }
}

const DetailPanel = React.createClass({

  componentWillMount() {
    loadData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    const { id, concept } = nextProps;

    if (this.props.id !== id) {
      loadData(nextProps);
    }

    if ((this.props.concept && this.props.concept.id) !== (concept && concept.id)) {
      if (concept.type === 'tnl:Person') {
        this.props.dispatch(api.actions.orgsFromPerson({ id: concept.id }));
        this.props.dispatch(api.actions.peopleFromOrgsFromPerson({ id: concept.id }));
      } else {
        this.props.dispatch(api.actions.peopleFromOrg({ id: concept.id }));
      }
    }
  },

  render() {
    const { concept, conceptRelations, conceptNetwork, dispatch, flags } = this.props;

    if (!concept) {
      return null;
    }

    return (
      <div style={{ display: 'flex', flex: 1 }}>
        <ConceptDropTarget concept={concept}>
          <Detail
            concept={concept}
            conceptRelations={conceptRelations}
            conceptNetwork={conceptNetwork}
            flags={flags}
            dispatch={dispatch}
          />
      </ConceptDropTarget>
      </div>
    );
  },

});

export default connect(
  (state) => {
    const {
      router: { location },
      data: { concept, orgsFromPerson, peopleFromOrg, peopleFromOrgsFromPerson, flags },
    } = state;

    // Fetch #hash id from location.state OR fall back on location.hash (on initial pageload)
    const id = (location.state && location.state.hash) || (!!location.hash && location.hash.substring(1));
    const conceptRelations = (concept.data && concept.data.type) === 'tnl:Person' ? orgsFromPerson : peopleFromOrg;
    const conceptNetwork = (concept.data && concept.data.type) === 'tnl:Person' ? peopleFromOrgsFromPerson.data : null;

    return {
      id,
      flags: flags.data,
      concept: concept.data,
      conceptRelations: conceptRelations.data,
      conceptNetwork,
    };
  }
)(DetailPanel);
