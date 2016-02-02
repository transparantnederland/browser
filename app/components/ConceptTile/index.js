import './index.css';
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

import Name from './../Name';
import Type from './../Type';
import Dataset from './../Dataset';

/**
 * Implements the drag source contract.
 */
const conceptSource = {
  beginDrag(props) {
    return {
      concept: props.concept,
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      window.alert(`You dropped ${item.concept.name} into ${dropResult.concept.name}`);
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

const ConceptTile = ({ concept, connectDragSource }) =>
  connectDragSource(
    <div className="ConceptTile">
      <div className="ConceptTile-heading">
        <Name name={concept.name}/>
      </div>
      <div className="ConceptTile-body">
        <Type type={concept.type}/>
        <Dataset dataset={concept.datasets}/>
      </div>
    </div>
  );

ConceptTile.propTypes = {
  concept: PropTypes.object.isRequired,
};

export default DragSource('CONCEPT', conceptSource, collect)(ConceptTile);
