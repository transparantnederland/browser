import React, { PropTypes } from 'react';

import ModalHeading from '../ModalHeading';
import ModalBody from '../ModalBody';
import ModalFooter from '../ModalFooter';
import ConceptTile from '../ConceptTile';
import Select from '../Select';
import Button from '../Button';
import Padding from '../Padding';
import Flex from '../Flex';
import FlexItem from '../FlexItem';


const FlagRelationModal = ({ flag, onChange, onCancel, onToggle, onSubmit }) =>
  <div>
    <ModalHeading>Create a relation?</ModalHeading>
    <ModalBody>
      <Padding vertical>
        <ConceptTile concept={flag.concept} />
      </Padding>
      <Flex>
        <FlexItem>
          <Select options={flag.meta.relationOptions} value={flag.value.type} onChange={onChange} />
        </FlexItem>
        {flag.meta.canToggle ? <Button onClick={onToggle}>↑↓</Button> : null}
      </Flex>
      <Padding vertical>
        <ConceptTile concept={flag.value.concept} />
      </Padding>
    </ModalBody>
    <ModalFooter>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onSubmit} type="primary">Create</Button>
    </ModalFooter>
  </div>;

FlagRelationModal.propTypes = {
  flag: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FlagRelationModal;
