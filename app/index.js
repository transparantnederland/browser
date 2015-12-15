var React = require('react');
var ReactDOM = require('react-dom');

import CreateRelation from './components/CreateRelation';
import ObjectSearch from './components/ObjectSearch';

require('./../css/normalize.css');
require('./../css/skeleton.css');
require('./../css/style.css');

const App = React.createClass({
  render() {
    var apiUrl = this.props.config.api.baseUrl;
    return (
      <div className="container">
        <div id="object1" className="col">
          <ObjectSearch apiUrl={apiUrl} selectPit={this.selectPitFrom} title="1. Find first PIT" />
        </div>
        <div id="relation" className="col">
          <CreateRelation apiUrl={apiUrl} ref="createRelation" title="3. Create a relation" />
        </div>
        <div id="object2" className="col">
          <ObjectSearch apiUrl={apiUrl} selectPit={this.selectPitTo} title="2. Find second PIT" />
        </div>
      </div>
    );
  },

  selectPitFrom(pit) {
    this.refs.createRelation.setPitFrom(pit);
  },

  selectPitTo(pit) {
    this.refs.createRelation.setPitTo(pit);
  },
});

var el = document.getElementById('app');
ReactDOM.render(<App config={__CONFIG__} />, el);
