import React from 'react';
import { connect } from 'react-redux';

import api from './../middleware/api';

import Detail from './../components/Detail';
import ConceptList from './../components/ConceptList';
import Search from './../components/Search';

import _ from 'lodash';

import './MainView.css';

function loadData(props, state) {
  const { query } = props;
  const { q } = state;

  const params = Object.assign({}, query, { q });

  props.fetchConcepts(params);
}

const MainView = React.createClass({
  componentWillMount() {
    loadData(this.props, this.state);
  },

  getInitialState() {
    return {
      selectedConcept: null,
      q: '*',
    };
  },

  componentWillReceiveProps(nextProps) {
    const { selectedConcept } = this.state;
    const { relations, query } = nextProps;

    if (!_.isEqual(this.props.query, query)) {
      loadData(nextProps, this.state);
    }

    if (relations && selectedConcept && !selectedConcept.relations.length) {
      this.setState({
        selectedConcept: Object.assign({}, selectedConcept, {
          relations: selectedConcept.pits.map((pit) => ({
            pit,
            relation_type: 'tnl:same',
          })).concat([...relations]),
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
          <div className="MainView-listSearch">
            <Search onChangeQuery={this._onSearchChange} />
          </div>
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

  _onSearchChange(text) {
    const q = text.trim() + '*';

    this.setState({ q }, () => loadData(this.props, this.state));
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
    const { type, dataset } = state.router.params;
    const query = {};

    if (type) {
      query.type = type;
    }

    if (dataset) {
      query.dataset = dataset;
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
