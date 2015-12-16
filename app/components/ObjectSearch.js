import React, { PropTypes } from 'react';

import Feature from './Feature';

export default React.createClass({
  propTypes: {
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    results: PropTypes.object,
  },

  getInitialState() {
    return {
      timeout: null,
      query: '',
    };
  },

  render() {
    var results = (this.props.results && this.props.results.data) || [];

    return (
      <div>
        <div className="pad-top">
          <h2>{this.props.title}</h2>
        </div>
        <div className="pad-all">
          <input type="search" ref="search" placeholder="Search by name, URI, or Histograph ID" />
        </div>
        <ul className="concepts">
          {results.map(function (feature, index) {
            return (
              <li className="concept" key={this.state.query + index}>
                <Feature feature={feature} selectPit={this.props.onSelect} />
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
    var query = this.refs.search.value;
    this.setState({
      query,
    });
    this.props.onSearch(query);
  },
});
