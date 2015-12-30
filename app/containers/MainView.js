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

  render() {
    const { concepts } = this.props;
    const { selectedConcept } = this.state;

    return (
      <div className="MainView">
        <div className="MainView-list">
          <ConceptList
            concepts={concepts}
            selected={selectedConcept}
            onConceptSelect={(concept) => {
              this.setState({
                selectedConcept: concept,
              });
            }}
          />
        </div>
        <div className="MainView-detail">
          {selectedConcept ? <Detail concept={selectedConcept} /> : null}
        </div>
      </div>
    );
  },
});

export default connect(
  (state) => {
    return {
      concepts: state.search.data || [],
    };
  },
  {
    fetchConcepts: api.actions.search,
  }
)(MainView);
