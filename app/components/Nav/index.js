import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import api from './../../middleware/api';

import './index.css';

function loadData(props) {
  props.fetchTypes();
  props.fetchDatasets();
}

const Nav = React.createClass({
  componentWillMount() {
    loadData(this.props);
  },

  render() {
    const { types, datasets } = this.props;

    return (
      <div className="Nav">
        <div className="Nav-brand">Transparant Nederland</div>
        <ul className="Nav-menu">
          <li className="Nav-menuItem">
            <Link to="/" className="Nav-menuItemLink">All</Link>
          </li>
          <li className="Nav-menuHeading">Types</li>
          {types.map((type) =>
            <li className="Nav-menuItem" key={type}>
              <Link to={['/type', type].join('/')} className="Nav-menuItemLink">{type}</Link>
            </li>
          )}
          <li className="Nav-menuHeading">Datasets</li>
          {datasets.map((dataset) =>
            <li className="Nav-menuItem" key={dataset.id}>
              <Link to={['/dataset', dataset.id].join('/')} className="Nav-menuItemLink">{dataset.title}</Link>
            </li>
          )}
        </ul>
      </div>
    );
  },
});

export default connect(
  (state) => ({
    types: state.types.data || [],
    datasets: state.datasets.data || [],
  }),
  {
    fetchTypes: api.actions.types,
    fetchDatasets: api.actions.datasets,
  }
)(Nav);
