import React, { PropTypes } from 'react';

export default React.createClass({

  propTypes: {
    concept: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  render() {
    const { pit, relations } = this.props.concept[0];

    return (
      <div className="pad-all concept" onClick={() => this.props.onSelect(this.props.concept)}>
        <h3>
          <span>{pit.name} {relations.length ? '(' + relations.length + ')' : ''}</span>
          <span className="type">{pit.type}</span>
        </h3>
      </div>
    );
  },
});
