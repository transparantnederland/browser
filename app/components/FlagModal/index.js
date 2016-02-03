import './index.css';
import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import FlagRelationModal from '../FlagRelationModal';

const FlagModal = ({ flag, isOpen, relationTypes, onCancel, onChange, onSubmit }) =>
  <Modal
    isOpen={isOpen}
    closeTimeoutMS={150}
    onRequestClose={onCancel}
  >
    {flag && flag.type === 'missing-relation' ?
      <FlagRelationModal
        flag={flag}
        relationTypes={relationTypes}
        onCancel={onCancel}
        onChange={onChange}
        onSubmit={onSubmit}
      /> : null
    }
  </Modal>;

FlagModal.propTypes = {
  flag: PropTypes.object.isRequired,
  relationTypes: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FlagModal;
