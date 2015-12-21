import React, { PropTypes } from 'react';

import Concept from './Concept';

export default React.createClass({
  propTypes: {
    concepts: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  render() {
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
            className="u-full-width"
          />
        </div>
        <ul className="concepts">
          {this.props.concepts.map(function (concept) {
            const { pit } = concept[0];

            return (
              <li key={pit.id}>
                <Concept concept={concept} onSelect={this.props.onSelect} />
              </li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  },
});
