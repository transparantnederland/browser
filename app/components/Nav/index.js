import './index.css';
import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

import InfoBubble from '../InfoBubble';
import Logo from '../Logo';
import Type from '../Type';

const Nav = ({ datasets, types }) =>
  <div className="Nav">
    <div className="Nav-brand">
      <IndexLink to="/">
        <Logo />
      </IndexLink>
    </div>

    <ul className="Nav-menu">
      <li className="Nav-menuItem">
        <IndexLink
          to="/"
          className="Nav-menuItemLink"
          activeClassName="Nav-menuItemLink--active"
        >
          All
        </IndexLink>
      </li>

      {types.length ? <li className="Nav-menuHeading">Types</li> : null}
      {types.map((type) =>
        <li className="Nav-menuItem" key={type}>
          <Link
            to={['/type', type].join('/')}
            className="Nav-menuItemLink"
            activeClassName="Nav-menuItemLink--active"
          >
            <Type type={type}/>
          </Link>
        </li>
      )}

      {types.length ? <li className="Nav-menuHeading">Sources</li> : null}
      {datasets.map((dataset) =>
        <li className="Nav-menuItem" key={dataset.id}>
          <Link
            to={['/dataset', dataset.id].join('/')}
            className="Nav-menuItemLink"
            activeClassName="Nav-menuItemLink--active"
          >
            {dataset.title}
            <div className="Nav-menuItemInfoBubble">
              <InfoBubble info={dataset.description} />
            </div>
          </Link>
        </li>
      )}
    </ul>
  </div>;

Nav.propTypes = {
  datasets: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
};

export default Nav;
