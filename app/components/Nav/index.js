import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import api from './../../middleware/api';

import './index.css';

function loadData(props) {
  props.fetchTypes();
}

const Nav = React.createClass({
  componentWillMount() {
    loadData(this.props);
  },

  render() {
    const { types } = this.props;

    return (
      <div className="Nav">
        <div className="Nav-brand">Transparant Nederland</div>
        <ul className="Nav-menu">
          <li className="Nav-menuItem">
            <Link to="/" className="Nav-menuItemLink">All</Link>
          </li>
          <li className="Nav-menuHeading">Types</li>
          {types.map((type) =>
            <li className="Nav-menuItem">
              <Link to={['/type', type].join('/')} className="Nav-menuItemLink">{type}</Link>
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
  }),
  {
    fetchTypes: api.actions.types,
  }
)(Nav);
