import React, { PropTypes } from 'react';

import Concept from './Concept';

export default React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    concepts: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      typeFilter: '',
    };
  },

  render() {
    const { typeFilter } = this.state;

    return (
      <div>
        <div className="pad-top">
          <select className="u-pull-right" onChange={this.handleFilterChange}>
            <option value="">All Results</option>
            <option value="tnl:Person">tnl:Person</option>
            <option value="tnl:Public">tnl:Public</option>
            <option value="tnl:Organization">tnl:Organization</option>
            <option value="tnl:PoliticalParty">tnl:PoliticalParty</option>
          </select>
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
          {this.props.concepts.filter(function (concept) {
            const { pit } = concept[0];
            return typeFilter === '' || typeFilter === pit.type;
          }).map(function (concept) {
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

  handleFilterChange(event) {
    const value = event.target.value;
    this.setState({
      typeFilter: value,
    });
  },
});
