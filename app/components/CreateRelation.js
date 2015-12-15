import React from 'react';

var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

export default React.createClass({
  getInitialState() {
    var relations = [];
    var relationsStr = localStorage.getItem('relations');
    if (relationsStr) {
      try {
        relations = JSON.parse(relationsStr);
      } catch (e) {
        relations = [];
      }
    }

    return {
      from: null,
      to: null,
      types: [],
      relation: 'tnl:related',
      relations,
    };
  },

  render() {
    var relations = this.state.relations;
    return (
      <div>
        <div className="pad-top">
          <h2>{this.props.title}</h2>
        </div>
        <div className="pad-all input">
          <select ref="select" value={this.state.relation} onChange={this.setRelation}>
          {this.state.types.map(function (type) {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
          </select>
          <button className="btn btn-1 btn-1e" onClick={this.createRelation}>Create!</button>
        </div>
        <div className="pad-all">
          <div id="relations-container">
            <Codemirror value={relations.join('\n')} options={{ mode: 'javascript' }} />
          </div>
        </div>
      </div>
    );
  },

  componentDidMount() {
    fetch(this.props.apiUrl + 'schemas/relations')
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        this.setState({
          types: json.properties.type.enum,
        });
      }.bind(this));
  },

  setRelation() {
    var relation = this.refs.select.value;
    this.setState({
      relation,
    });
  },

  createRelation() {
    var from = this.state.from ? (this.state.from.id || this.state.from.uri) : null;
    var to = this.state.to ? (this.state.to.id || this.state.to.uri) : null;
    var type = this.state.relation;

    var relation = {
      from,
      to,
      type,
    };

    var relations = this.state.relations;
    relations.push(JSON.stringify(relation));

    localStorage.setItem('relations', JSON.stringify(relations));

    this.setState({
      relations,
    });
  },

  setPitFrom(pit) {
    this.setState({
      from: pit,
    });
  },

  setPitTo(pit) {
    this.setState({
      to: pit,
    });
  },
});
