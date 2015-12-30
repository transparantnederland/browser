import React, { PropTypes } from 'react';

import './index.css';

const Detail = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
  },

  render() {
    const { concept } = this.props;

    return (
      <div className="Detail">
        <div className="Detail-name">{concept.name}</div>
        <div className="Detail-type">{concept.type}</div>

        <div className="Detail-header">Relations</div>
        {concept.pits.map((pit) => <div>{pit.name} tnl:same</div>)}
      </div>
    );
    // {Object.keys(pit.data || {}).map((key) => <div>{key}{pit.data[key]}</div>)}
  },
});

export default Detail;
