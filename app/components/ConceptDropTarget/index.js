import './index.css';
import React from 'react';
import { DropTarget } from 'react-dnd';

const ConceptDropTarget = ({ connectDropTarget, isOver, children }) =>
  connectDropTarget(
    <div className="ConceptDropTarget">
      {isOver ? <div className="ConceptDropTarget-overlay">
        <div className="ConceptDropTarget-body">
          Drop here to create a relation.
        </div>
      </div> : null}
      {children}
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
