import React, { PropTypes } from 'react';

import './index.css';

const Pit = React.createClass({
  propTypes: {
    pit: PropTypes.object.isRequired,
  },

  render() {
    const { pit } = this.props;

    return (
      <div className="Pit">
        <div className="Pit-name">{pit.name}</div>
        <div className="Pit-type">{pit.type}</div>
        <div className="Pit-dataset">{pit.dataset}</div>
        <div className="Pit-id">{pit.id}</div>
        <table>
        {Object.keys(pit.data).map((key) =>
          <tr>
            <td>{key}</td>
            <td>{pit.data[key]}</td>
          </tr>
        )}
        </table>
      </div>
    );
  },
});

export default Pit;
