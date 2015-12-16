import React, { PropTypes } from 'react';

var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

export default React.createClass({
  propTypes: {
    relations: PropTypes.array.isRequired,
    schema: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onRelationAdd: PropTypes.func.isRequired,
  },

  render() {
    const { relations, schema, title, type, onRelationAdd } = this.props;
    const types = (schema.data && schema.data.properties.type.enum) || [];

    return (
      <div>
        <div className="pad-top">
          <h2>{title}</h2>
        </div>
        <div className="pad-all input">
          <select value={type} ref="select" onChange={this.handleChange}>
            <option value="" key="">-- selecteer --</option>
            {types.map(function (value) {
              return (
                <option value={value} key={value}>
                  {value}
                </option>
              );
            })}
          </select>
          <button className="btn btn-1 btn-1e" onClick={onRelationAdd}>Create!</button>
        </div>
        <div className="pad-all">
          <div id="relations-container">
            <Codemirror value={relations.map((value) => JSON.stringify(value)).join('\n')} options={{ mode: 'javascript' }} />
          </div>
        </div>
      </div>
    );
  },

  handleChange(event) {
    event.preventDefault();
    const node = this.refs.select;
    const value = node.value;

    this.props.onTypeChange(value);
  },
});
