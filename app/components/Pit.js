import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="pad-all" onClick={this.select}>
        <h4>{this.props.pit.name || this.props.pit.id}</h4>
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td className="label">Dataset</td>
                <td><code>{this.props.pit.dataset}</code></td>
              </tr>
              <tr>
                <td className="label">ID</td>
                <td>{this.props.pit.id || this.props.pit.uri}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  select() {
    this.props.selectPit(this.props.pit);
  },
});
