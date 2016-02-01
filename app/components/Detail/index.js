import React, { PropTypes } from 'react';

import Name from '../Name';
import Type from '../Type';
import Dataset from '../Dataset';
import Button from '../Button';
import OrganizationRelationTile from '../OrganizationRelationTile';
import PersonRelationTile from '../PersonRelationTile';
import NetworkRelationTile from '../NetworkRelationTile';
import FlagList from '../FlagList';
import Pit from '../Pit';

import { initFlag } from '../../actions/flag';

import './index.css';

const Detail = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
    conceptRelations: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      showPits: false,
    };
  },

  render() {
    const { concept, conceptRelations, conceptNetwork, flags } = this.props;
    const { showPits } = this.state;

    return (
      <div className="Detail">
        <div className="Detail-actions">
          <Button onClick={this.handleFlag}>Flag</Button>
        </div>
        <div className="Detail-heading">
          <Name name={concept.name}/>
        </div>
        <div className="Detail-subheading">
          <Type type={concept.type}/>
          <Dataset dataset={concept.datasets}/>
          <Button
            onClick={this.handlePitsToggle}
            type="link"
          >
            {showPits ? 'Hide details ▴' : 'Show details ▾'}
          </Button>
        </div>

        {showPits ?
          <div>
            {concept.pits.map((pit) =>
              <div key={pit.id}>
                <Pit pit={pit}/>
              </div>
            )}
          </div> : null
        }

        {flags.length ?
          <div>
            <div className="Detail-header">Flags</div>
            <FlagList flags={flags} />
          </div> : null
        }

        <div className="Detail-header">Relations</div>
        {conceptRelations.length ?
          <ul>
            {conceptRelations.map((relation) =>
              <li key={relation.concept.id}>
                {concept.type === 'tnl:Person'
                  ? <PersonRelationTile relation={relation} />
                  : <OrganizationRelationTile relation={relation} />
                }
              </li>
            )}
          </ul> : <span>No relations found</span>
        }

        {conceptNetwork ?
          <div>
            <div className="Detail-header">Network</div>
            {conceptNetwork.length ?
              <ul>
                {conceptNetwork.map((relation) =>
                  <li key={relation.concept.id}>
                    <NetworkRelationTile relation={relation} />
                  </li>
                )}
              </ul> : <span>No network found</span>
            }
          </div> : null
        }

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

export default Detail;
