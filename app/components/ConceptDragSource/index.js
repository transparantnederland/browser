import './index.css';
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import { addRelation } from '../../actions/flag';

const ConceptDragSource = ({ children, connectDragSource, isDragging }) =>
  connectDragSource(
    <div className="ConceptDragSource" style={{ opacity: isDragging ? 0.14 : 1 }}>
      {children}
    </div>
  );

ConceptDragSource.propTypes = {
  concept: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

/**
 * Implements the drag source contract.
 */
const source = {
  beginDrag(props) {
    return {
      concept: props.concept,
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      props.dispatch(addRelation(item.concept, dropResult.concept));
      // window.alert(`You dropped ${item.concept.name} into ${dropResult.concept.name}`);
    }
  },
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource('CONCEPT', source, collect)(ConceptDragSource);
