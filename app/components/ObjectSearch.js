import React, { PropTypes } from 'react';

import Feature from './Feature';

export default React.createClass({
  propTypes: {
    results: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  render() {
    var results = (this.props.results && this.props.results.data) || [];

    return (
      <div>
        <div className="pad-top">
          <h2>{this.props.title}</h2>
        </div>
        <div className="pad-all">
          <input
            type="search"
            placeholder="Search by name, URI, or TNL ID"
            onChange={(event) => this.props.onSearch(event.target.value)}
          />
        </div>
        <ul className="concepts">
          {results.map(function (feature) {
            return (
              <li className="concept" key={feature.pits[0].id}>
                <Feature feature={feature} selectPit={this.props.onSelect} />
              </li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  },
});
