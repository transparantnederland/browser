import './index.css';
import React, { PropTypes } from 'react';

import HashLink from './../HashLink';
import ConceptTile from './../ConceptTile';
import ConceptDragSource from '../ConceptDragSource';

const ConceptList = ({ concepts, dispatch }) =>
  <ul className="List">
    {concepts.map((concept) =>
      <li className="List-item" key={concept.id}>
        <HashLink hash={concept.id}>
          <ConceptDragSource concept={concept} dispatch={dispatch}>
            <ConceptTile concept={concept}/>
          </ConceptDragSource>
        </HashLink>
      </li>
    )}
  </ul>;

ConceptList.propTypes = {
  concepts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ConceptList;
