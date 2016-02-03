import './index.css';
import React, { PropTypes } from 'react';

import HashLink from './../HashLink';
import ConceptTile from './../ConceptTile';
import ConceptDragSource from '../ConceptDragSource';
import Padding from '../Padding';

const ConceptList = ({ concepts, concept, dispatch }) =>
  <ul className="List">
    {concepts.map((item) =>
      <li
        className={['List-item', item.id === concept.id ? 'List-item--active' : ''].join(' ')}
        key={item.id}
      >
        <HashLink hash={item.id}>
          <ConceptDragSource concept={item} dispatch={dispatch}>
            <Padding>
              <ConceptTile concept={item} />
            </Padding>
          </ConceptDragSource>
        </HashLink>
      </li>
    )}
  </ul>;

ConceptList.propTypes = {
  concepts: PropTypes.array.isRequired,
  concept: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ConceptList;
