import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './index.css';

const Nav = React.createClass({
  render() {
    return (
      <div className="Nav">
        <div className="Nav-brand">Transparant Nederland</div>
        <ul className="Nav-menu">
          <li className="Nav-menuItem">
            <Link to="/" className="Nav-menuItemLink">All</Link>
          </li>
          <li className="Nav-menuHeading">Types</li>
        </ul>
      </div>
    );
  },
});

export default connect(
  (state) => (state)
)(Nav);
