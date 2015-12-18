import React, { PropTypes } from 'react';

import Pit from './Pit';

export default React.createClass({
  propTypes: {
    relations: PropTypes.array.isRequired,
    schema: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    from: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    to: PropTypes.array.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onRelationAdd: PropTypes.func.isRequired,
  },

  render() {
    const { schema, title, type, onRelationAdd } = this.props;
    const types = (schema.data && schema.data.properties.type.enum) || [];

    return (
      <div>
        <div className="pad-top">
          <h2>{title}</h2>
        </div>
        <div className="pad-all">
          {this.props.from ? <Pit pit={this.props.from[0].pit} /> : null}
        </div>
        <div className="pad-top input">
          <select
            value={type}
            onChange={(event) => this.props.onTypeChange(event.target.value)}
            className="u-full-width"
          >
            <option value="" key="">-- select a relationship --</option>
            {types.map(function (value) {
              return (
                <option value={value} key={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="pad-all">
          {this.props.to ? <Pit pit={this.props.to[0].pit} /> : null}
        </div>
        <div className="pad-all input">
          <button
            onClick={onRelationAdd}
            className="button button-primary u-full-width"
            disabled={!this.canCreateRelation()}
          >
            Create relation!
        </button>
        </div>
      </div>
    );
  },

  canCreateRelation() {
    return this.props.from !== null
      && this.props.to !== null
      && this.props.type !== '';
  },
});
