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
        {pit.data ?
          <table>
            <tbody>
            {Object.keys(pit.data).map((key) =>
              <tr key={key}>
                <td>{key}</td>
                <td>{pit.data[key]}</td>
              </tr>
            )}
            </tbody>
          </table> : null
        }
      </div>
    );
  },
});

export default Pit;
