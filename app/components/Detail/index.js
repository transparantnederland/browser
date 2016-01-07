import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Concept from '../Concept';

import { initFlag } from '../../actions/flag';

import './index.css';

const Detail = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
    conceptRelations: PropTypes.array.isRequired,
  },

  render() {
    const { concept, conceptRelations } = this.props;

    return (
      <div className="Detail">
        <div className="Detail-name">{concept.name}</div>
        <div className="Detail-type">{concept.type}</div>

        <button onClick={this.handleFlag}>Flag</button>

        <div className="Detail-header">Relations</div>
        {conceptRelations.length ?
          <table className="Detail-relations">
            <thead>
              <tr>
                <td>Name</td>
                <td>Relation Type</td>
              </tr>
            </thead>
            <tbody>
              {conceptRelations.map((relation) =>
                <tr key={relation.concept.id}>
                  <td><Concept concept={relation.concept}/></td>
                  <td>{relation.type}</td>
                </tr>
              )}
            </tbody>
          </table> : null}
      </div>
    );
  },
  handleFlag() {
    this.props.dispatch(initFlag(this.props.concept));
  },
});

export default connect(
  (state) => (state)
)(Detail);
