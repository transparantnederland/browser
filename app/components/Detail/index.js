import React, { PropTypes } from 'react';

import './index.css';

const Detail = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
  },

  render() {
    const {
      concept: {
        name,
        type,
        relations,
      },
    } = this.props;

    return (
      <div className="Detail">
        <div className="Detail-name">{name}</div>
        <div className="Detail-type">{type}</div>

        <div className="Detail-header">Relations</div>
        <table className="Detail-relations">
          <thead>
            <tr>
              <td>Name</td>
              <td>Relation Type</td>
              <td>Dataset</td>
            </tr>
          </thead>
          <tbody>
            {relations.map((relation) =>
              <tr key={relation.pit.id}>
                <td>{relation.pit.name}</td>
                <td>{relation.relation_type}</td>
                <td>{relation.pit.dataset}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  },
});

export default Detail;
