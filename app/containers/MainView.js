import React from 'react';
import { connect } from 'react-redux';

import api from './../middleware/api';

import Detail from './../components/Detail';
import ConceptList from './../components/ConceptList';

import './MainView.css';

function loadData(props) {
  props.fetchConcepts({ q: '*' });
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
    const { relations } = nextProps;

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
    return {
      concepts: state.search.data || [],
      relations: state.orgsFromPerson.data || [],
    };
  },
  {
    fetchConcepts: api.actions.search,
    fetchConceptRelations: api.actions.orgsFromPerson,
  }
)(MainView);
