import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import api from '../utils/api';

import Detail from '../components/Detail';
import ConceptList from '../components/ConceptList';
import FlagModal from '../components/FlagModal';
import Search from '../components/Search';

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
      q: '*',
    };
  },

  componentWillReceiveProps(nextProps) {
    const { query } = nextProps;

    if (!_.isEqual(this.props.query, query)) {
      loadData(nextProps, this.state);
    }
  },

  render() {
    const { concepts, concept, conceptRelations, flag } = this.props;

    return (
      <div className="MainView">
        <div className="MainView-list">
          <div className="MainView-listSearch">
            <Search onChangeQuery={this._onSearchChange} />
          </div>
          <ConceptList
            concepts={concepts}
            selected={concept}
            onConceptSelect={this._onConceptSelect}
          />
        </div>
        <div className="MainView-detail">
          {concept ? <Detail concept={concept} conceptRelations={conceptRelations}/> : null}
        </div>
        {flag ? <FlagModal flag={flag} /> : null}
      </div>
    );
  },

  _onSearchChange(text) {
    const q = text.trim() + '*';

    this.setState({ q }, () => loadData(this.props, this.state));
  },

  _onConceptSelect(concept) {
    const { id } = concept;
    this.props.fetchConcept({ id });
  },
});

export default connect(
  (state) => {
    const {
      router: { params: { type, dataset } },
      data: { concepts, concept, conceptRelations },
    } = state;
    const query = {};

    if (type) {
      query.type = type;
    }

    if (dataset) {
      query.dataset = dataset;
    }

    return {
      query,
      concepts: concepts.data,
      concept: concept.data,
      conceptRelations: conceptRelations.data,
    };
  },
  {
    fetchConcepts: api.actions.concepts,
    fetchConcept: api.actions.concept,
  }
)(MainView);
