import React, { PropTypes } from 'react';

import ModalHeading from '../ModalHeading';
import ModalBody from '../ModalBody';
import ModalFooter from '../ModalFooter';
import ConceptTile from '../ConceptTile';
import Select from '../Select';
import Button from '../Button';
import Padding from '../Padding';

const FlagRelationModal = ({ flag, relationTypes, onChange, onCancel, onSubmit }) => {
  const sameTypes = ['tnl:same', 'tnl:parent'];
  const isSameType = (flag.concept.type === flag.value.concept.type) || (flag.concept.type !== 'tnl:Person' && flag.value.concept.type !== 'tnl:Person');
  const options = relationTypes.filter((type) => {
    return sameTypes.includes(type) === isSameType;
  });

  return (
    <div>
      <ModalHeading>Create a relation?</ModalHeading>
      <ModalBody>
        <Padding vertical>
          <ConceptTile concept={flag.concept} />
        </Padding>
        <Select options={options} value={flag.value.type} onChange={onChange} />
        <Padding vertical>
          <ConceptTile concept={flag.value.concept} />
        </Padding>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit} type="primary">Create</Button>
      </ModalFooter>
    </div>
  );
};

FlagRelationModal.propTypes = {
  flag: PropTypes.object.isRequired,
  relationTypes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FlagRelationModal;
