import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    pit: PropTypes.object.isRequired,
  },

  render() {
    const { name, id, uri, dataset } = this.props.pit;
    return (
      <div className="pad-all" onClick={this.handleClick}>
        <h4>{name || id}</h4>
        <div className="table-container">
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
      </div>
    );
  },

  handleClick() {
    this.props.selectPit(this.props.pit);
  },
});
