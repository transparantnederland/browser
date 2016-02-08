import React, { PropTypes } from 'react';

import ModalHeading from '../ModalHeading';
import ModalBody from '../ModalBody';
import ModalFooter from '../ModalFooter';
import ConceptTile from '../ConceptTile';
import Select from '../Select';
import Button from '../Button';
import Padding from '../Padding';

const FlagConceptModal = ({ flag, onChange, onCancel, onSubmit }) => {
  const { concept, value, meta } = flag;

  return (
    <div>
      <ModalHeading>Wrong type?</ModalHeading>
      <ModalBody>
        <Padding vertical>
          <ConceptTile concept={concept} />
        </Padding>
        <Select options={meta.typeOptions} value={value.type} onChange={onChange} />
        <Padding vertical>
          <ConceptTile concept={Object.assign({}, value.concept, { type: value.type })} />
        </Padding>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit} type="primary">Update</Button>
      </ModalFooter>
    </div>
  );
};

FlagConceptModal.propTypes = {
  flag: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FlagConceptModal;
