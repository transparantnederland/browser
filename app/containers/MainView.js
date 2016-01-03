import React from 'react';
import { connect } from 'react-redux';

import api from './../middleware/api';

import Detail from './../components/Detail';
import ConceptList from './../components/ConceptList';

import _ from 'lodash';

import './MainView.css';

function loadData(props) {
  const { query } = props;
  const params = Object.assign({}, query, {
    q: '*',
  });

  props.fetchConcepts(params);
}

const MainView = React.createClass({
  componentWillMount() {
    loadData(this.props);
  },

  getInitialState() {
    return {
      selectedConcept: null,
    };
  },

  componentWillReceiveProps(nextProps) {
    const { selectedConcept } = this.state;
    const { relations, query } = nextProps;

    if (!_.isEqual(this.props.query, query)) {
      loadData(nextProps);
    }

    if (relations && selectedConcept && !selectedConcept.relations.length) {
      this.setState({
        selectedConcept: Object.assign({}, selectedConcept, {
          relations: [...relations].concat(selectedConcept.pits.map((pit) => ({
            pit,
            relation_type: 'tnl:same',
          }))),
        }),
      });
    }
  },

  render() {
    const { concepts } = this.props;
    const { selectedConcept } = this.state;

    return (
      <div className="MainView">
        <div className="MainView-list">
          <ConceptList
            concepts={concepts}
            selected={selectedConcept}
            onConceptSelect={this._onConceptSelect}
          />
        </div>
        <div className="MainView-detail">
          {selectedConcept ?
            <Detail
              concept={selectedConcept}
            />
          : null}
        </div>
      </div>
    );
  },

  _onConceptSelect(concept) {
    const { id } = concept;

    this.setState({
      selectedConcept: Object.assign({}, concept, {
        relations: [],
      }),
    });
    this.props.fetchConceptRelations({ id });
  },
});

export default connect(
  (state) => {
    const { type } = state.router.params;
    const query = {};

    if (type) {
      query.type = type;
    }

    return {
      query,
      concepts: state.search.data || [],
      relations: state.orgsFromPerson.data || [],
    };
  },
  {
    fetchConcepts: api.actions.search,
    fetchConceptRelations: api.actions.orgsFromPerson,
  }
)(MainView);

// all
// types - tnl:Organization etc…
// datasets - dbpedia_sg
