import React from 'react';
import { connect } from 'react-redux';

import api from '../utils/api';

import Detail from '../components/Detail';
import FlagModal from '../components/FlagModal';

function loadData(props) {
  const { id } = props;

  if (id) {
    props.dispatch(api.actions.concept({ id }));
  }
}

const DetailContainer = React.createClass({

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
      } else {
        this.props.dispatch(api.actions.peopleFromOrg({ id: concept.id }));
      }
    }
  },

  render() {
    const { concept, conceptRelations, dispatch, flag } = this.props;

    if (!concept) {
      return null;
    }

    return (
      <div style={{ display: 'flex', flex: 1 }}>
        <Detail concept={concept} conceptRelations={conceptRelations} dispatch={dispatch} />
        {flag ? <FlagModal flag={flag} /> : null}
      </div>
    );
  },

});

export default connect(
  (state) => {
    const {
      flag,
      router: { location },
      data: { concept, orgsFromPerson, peopleFromOrg },
    } = state;

    const id = location.state && location.state.hash;
    const conceptRelations = (concept.data && concept.data.type) === 'tnl:Person' ? orgsFromPerson : peopleFromOrg;

    return {
      flag,
      id,
      concept: concept.data,
      conceptRelations: conceptRelations.data,
    };
  }
)(DetailContainer);
