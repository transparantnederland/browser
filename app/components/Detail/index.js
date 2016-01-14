import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Concept from '../Concept';
import Pit from '../Pit';

import { initFlag } from '../../actions/flag';

import './index.css';

const Detail = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
    conceptRelations: PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      showPits: false,
    };
  },

  render() {
    const { concept, conceptRelations } = this.props;
    const { showPits } = this.state;

    return (
      <div className="Detail">
        <div className="Detail-name">{concept.name}</div>
        <div className="Detail-type">{concept.type.replace('tnl:', '')}</div>


        <button onClick={this.handleFlag}>Flag</button>

        <button onClick={this.handlePitsToggle}>{showPits ? 'Hide' : 'Show'} pit details</button>

        {showPits ?
          <div>
            {concept.pits.map((pit) =>
              <div key={pit.id}>
                <Pit pit={pit}/>
              </div>
            )}
          </div> : null
        }

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
  handlePitsToggle() {
    this.setState({
      showPits: !this.state.showPits,
    });
  },
  handleFlag() {
    this.props.dispatch(initFlag(this.props.concept));
  },
});

export default connect(
  (state) => (state)
)(Detail);
