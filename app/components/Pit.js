import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    pit: PropTypes.object.isRequired,
  },

  render() {
    const { name, id, uri, dataset } = this.props.pit;
    return (
      <div className="pad-all pit">
        <h4>{name || id}</h4>
        <table>
          <tbody>
            <tr>
              <td className="label">Dataset</td>
              <td><code>{dataset}</code></td>
            </tr>
            <tr>
              <td className="label">ID</td>
              <td>{id || uri}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
});
