import './index.css';
import React from 'react';
import { DropTarget } from 'react-dnd';

const ConceptDropTarget = ({ connectDropTarget, isOver, children }) =>
  connectDropTarget(
    <div className="ConceptDropTarget">
      {isOver ? <div className="ConceptDropTarget-overlay">
        <div className="ConceptDropTarget-message">
          Drop here to create a relation.
        </div>
      </div> : null}
      <div className="ConceptDropTarget-content">
        {children}
      </div>
    </div>
  );

const target = {
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
