import './index.css';
import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import FlagRelationModal from '../FlagRelationModal';

const FlagModal = ({ flag, isOpen, onCancel, onChange, onToggle, onSubmit }) =>
  <Modal
    isOpen={isOpen}
    closeTimeoutMS={150}
    onRequestClose={onCancel}
  >
    {flag && flag.type === 'missing-relation' ?
      <FlagRelationModal
        flag={flag}
        onCancel={onCancel}
        onChange={onChange}
        onToggle={onToggle}
        onSubmit={onSubmit}
      /> : null
    }
  </Modal>;

FlagModal.propTypes = {
  flag: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FlagModal;
