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

    return sourceConcept.id !== targetConcept.id;
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
