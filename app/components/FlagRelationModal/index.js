import React, { PropTypes } from 'react';

import ModalHeading from '../ModalHeading';
import ModalBody from '../ModalBody';
import ModalFooter from '../ModalFooter';
import ConceptTile from '../ConceptTile';
import Select from '../Select';
import Button from '../Button';

const FlagRelationModal = ({ flag, relationTypes, onChange, onCancel, onSubmit }) =>
  <div>
    <ModalHeading>Create a relation?</ModalHeading>
    <ModalBody>
      <ConceptTile concept={flag.concept} />
      <Select options={relationTypes} value={flag.value.type} onChange={onChange} />
      <ConceptTile concept={flag.value.concept} />
    </ModalBody>
    <ModalFooter>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onSubmit} type="primary">Create</Button>
    </ModalFooter>
  </div>;

FlagRelationModal.propTypes = {
  flag: PropTypes.object.isRequired,
  relationTypes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FlagRelationModal;
