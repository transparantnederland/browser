import React from 'react';

import Feature from './Feature';

export default React.createClass({
  getInitialState() {
    return {
      timeout: null,
      query: '',
      geojson: null,
    };
  },

  render() {
    var features = [];

    if (this.state.geojson) {
      features = this.state.geojson;
    }

    return (
      <div>
        <div className="pad-top">
          <h2>{this.props.title}</h2>
        </div>
        <div className="pad-all">
          <input type="search" ref="search" placeholder="Search by name, URI, or Histograph ID" />
        </div>
        <ul className="concepts">
          {features.map(function (feature, index) {
            return (
              <li className="concept" key={this.state.query + index}>
                <Feature feature={feature} selectPit={this.props.selectPit} />
              </li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  },

  componentDidMount() {
    var node = this.refs.search;

    node.addEventListener('change', function () {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }

      this.search();
    }.bind(this));

    node.addEventListener('input', function () {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }

      this.setState({
        timeout: setTimeout(this.search, 800),
      });
    }.bind(this));
  },

  search() {
    var q = this.refs.search.value;

    fetch(this.props.apiUrl + 'search?q=' + q)
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        this.setState({
          geojson: json && json.map(function (concept) {
            return {
              properties: {
                pits: [concept[0].pit],
              },
            };
          }),
          query: q,
        });
      }.bind(this));
  },
});
