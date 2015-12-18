import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Codemirror from 'react-codemirror';

import api from './../store/api';
import { addRelation } from './../actions/relations';

import CreateRelation from './../components/CreateRelation';
import ObjectSearch from './../components/ObjectSearch';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

require('./../css/normalize.css');
require('./../css/skeleton.css');
require('./../css/style.css');

const MainView = React.createClass({
  propTypes: {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    relations: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      from: [],
      to: [],
      type: '',
      showModal: false,
    };
  },

  render() {
    return (
      <div className="content">
        <div className="header">
          <div className="container">
            <div className="row">
              <h1 className="brand">
                <span>Transparant Nederland</span>
              </h1>
              <button className="relations-button" onClick={this.handleExportClick}>
                Export Relations ({this.props.relations.length})
              </button>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="row">
              <div id="object1" className="columns three">
                <ObjectSearch
                  title="Find first PIT"
                  results={this.props.from}
                  onSearch={this.onFromSearch}
                  onSelect={this.onFromSelect}
                />
              </div>
              <div id="relation" className="columns six">
                <CreateRelation
                  title="Create a relation"
                  schema={this.props.relationSchema}
                  relations={this.props.relations}
                  from={this.state.from}
                  type={this.state.type}
                  to={this.state.to}
                  onTypeChange={this.onTypeChange}
                  onRelationAdd={this.onRelationAdd}
                />
              </div>
              <div id="object2" className="columns three">
                <ObjectSearch
                  title="Find second PIT"
                  results={this.props.to}
                  onSearch={this.onToSearch}
                  onSelect={this.onToSelect}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.showModal ? 'modal visible' : 'modal'}>
          <button className="close-button" onClick={this.handleModalCloseClick}>
            Close
          </button>
          <div className="modalContent">
            <Codemirror
              value={this.props.relations.map((value) => {
                const data = Object.assign({}, value, {
                  from: value.from[0].pit,
                  to: value.to[0].pit,
                });
                return JSON.stringify(data);
              }).join('\n')}
              options={{ mode: 'javascript' }}
            />
          </div>
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

  handleExportClick() {
    this.setState({
      showModal: true,
    });
  },

  handleModalCloseClick() {
    this.setState({
      showModal: false,
    });
  },

  onRelationAdd() {
    const { from, to, type } = this.state;
    this.props.dispatch(addRelation({ from, to, type }));
  },

  onFromSearch(q) {
    if (q) {
      this.props.dispatch(api.actions.from({ q }));
    } else {
      this.props.dispatch(api.actions.from.reset());
    }
  },

  onToSearch(q) {
    if (q) {
      this.props.dispatch(api.actions.to({ q }));
    } else {
      this.props.dispatch(api.actions.to.reset());
    }
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
