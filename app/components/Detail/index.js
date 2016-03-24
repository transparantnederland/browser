import './index.css';
import React, { PropTypes } from 'react';

import { addConceptFlag } from '../../actions/flag';

import Name from '../Name';
import Type from '../Type';
import LynksLink from '../LynksLink';
import Dataset from '../Dataset';
import Button from '../Button';
import RelationTile from '../RelationTile';
import NetworkRelationTile from '../NetworkRelationTile';
import FlagList from '../FlagList';
import Pit from '../Pit';

const Detail = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
    conceptRelations: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      showDetails: false,
    };
  },

  render() {
    const { concept, conceptRelations, conceptNetwork, flags, dispatch } = this.props;
    const { showDetails } = this.state;

    return (
      <div className="Detail">
        <div style={{ float: 'right' }}>
          <LynksLink id={concept.id}>
            Explore in Lynks
          </LynksLink>
        </div>
        <div className="Detail-heading">
          <Name name={concept.name}/>
        </div>
        <div className="Detail-subheading">
          <div>
            <Type type={concept.type}/>
            &nbsp;
            &nbsp;
            <Button onClick={this.handleEditTypeClick} type="link">✎ Edit type</Button>
          </div>
          <div>
            <Dataset dataset={concept.datasets}/>
          </div>
          <Button
            onClick={this.handlePitsToggle}
            type="link"
          >
            {showDetails ? 'Hide details ▴' : 'Show details ▾'}
          </Button>
        </div>

        {flags.length ?
          <div>
            <div className="Detail-header">Flags</div>
            <FlagList flags={flags} dispatch={dispatch} />
          </div> : null
        }

        <div className="Detail-header">Relations</div>
        {conceptRelations.length ?
          <ul>
            {conceptRelations.map((relation) => {
              const isPerson = concept.type === 'tnl:Person';
              const pit = isPerson ? concept.pits.find((item) => item.id === relation.relation.to) : relation.pit;
              const key = [relation.pit.id, relation.relation.since, relation.relation.until].join('-');

              return (
                <li key={key}>
                  <RelationTile relation={relation} showType={showDetails}/>
                  <div>
                    {showDetails && pit ? <Pit pit={pit}/> : null}
                  </div>
                </li>
              );
            })}
          </ul> : <span>No relations found</span>
        }

        {conceptNetwork ?
          <div>
            <div className="Detail-header">Network</div>
            {conceptNetwork.length ?
              <ul>
                {conceptNetwork.map((relation) =>
                  <li key={[relation.pit.id, relation.relation.to].join('-')}>
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
  handleEditTypeClick() {
    this.props.dispatch(addConceptFlag(this.props.concept));
  },
  handlePitsToggle() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  },
});

export default Detail;
