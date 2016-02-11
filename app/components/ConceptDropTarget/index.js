import './index.css';
import React from 'react';
import { DropTarget } from 'react-dnd';

const ConceptDropTarget = ({ connectDropTarget, isOver, canDrop, children }) =>
  connectDropTarget(
    <div className="ConceptDropTarget">
      {isOver ? <div className={['ConceptDropTarget-overlay', !canDrop ? 'ConceptDropTarget-overlay--disabled' : ''].join(' ')}>
        {canDrop ?
          <div className="ConceptDropTarget-message">
            Drop here to create a relation.
          </div> : null
        }
      </div> : null
      }
      <div className="ConceptDropTarget-content">
        {children}
      </div>
    </div>
  );

const target = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    const sourceConcept = item.concept;
    const targetConcept = props.concept;
    // Don't allow person <-> organization relations until we find a way to
    // decouple dates from PITs
    const isSameType = (sourceConcept.type === targetConcept.type) || ((sourceConcept.type !== 'tnl:Person' && targetConcept.type !== 'tnl:Person'));

    return isSameType && sourceConcept.id !== targetConcept.id;
  },
  drop(props) {
    return {
      concept: props.concept,
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

export default DropTarget('CONCEPT', target, collect)(ConceptDropTarget);
