import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import api from './../store/api';
import { addRelation } from './../actions/relations';

import CreateRelation from './../components/CreateRelation';
import ObjectSearch from './../components/ObjectSearch';

require('./../css/normalize.css');
require('./../css/skeleton.css');
require('./../css/style.css');

const MainView = React.createClass({
  propTypes: {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      from: null,
      to: null,
      type: '',
    };
  },

  render() {
    return (
      <div className="container">
        <div id="object1" className="col">
          <ObjectSearch
            title="1. Find first PIT"
            results={this.props.from}
            onSearch={this.onFromSearch}
            onSelect={this.onFromSelect}
          />
        </div>
        <div id="relation" className="col">
          <CreateRelation
            title="3. Create a relation"
            schema={this.props.relationSchema}
            relations={this.props.relations}
            type={this.state.type}
            onTypeChange={this.onTypeChange}
            onRelationAdd={this.onRelationAdd}
          />
        </div>
        <div id="object2" className="col">
          <ObjectSearch
            title="2. Find second PIT"
            results={this.props.to}
            onSearch={this.onToSearch}
            onSelect={this.onToSelect}
          />
        </div>
      </div>
    );
  },

  componentDidMount() {
    // Fetch relation types
    this.props.dispatch(api.actions.relationSchema());
  },

  onTypeChange(type) {
    this.setState({ type });
  },

  onRelationAdd() {
    const { from, to, type } = this.state;

    // if (!from) {
    //   return alert('Select first pit');
    // } else if (!to) {
    //   return alert('Select second pit');
    // } else if (!type) {
    //   return alert('Select relationship type');
    // }

    this.props.dispatch(addRelation({ from, to, type }));
  },

  onFromSearch(q) {
    this.props.dispatch(api.actions.from({ q }));
  },

  onToSearch(q) {
    this.props.dispatch(api.actions.to({ q }));
  },

  onFromSelect(from) {
    this.setState({ from });
  },

  onToSelect(to) {
    this.setState({ to });
  },
});

export default connect(
  (state) => (state)
)(MainView);
