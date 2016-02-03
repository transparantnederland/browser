import './index.css';
import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import admin from '../../utils/admin';
import { updateRelationType, resetFlag } from '../../actions/flag';

import FlagRelationModal from '../FlagRelationModal';

const FlagModal = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
    relationTypes: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
  },

  handleClose() {
    this.props.dispatch(resetFlag());
  },

  handleChange(event) {
    const value = event.target.value;
    this.props.dispatch(updateRelationType(value));
  },

  handleSubmit() {
    this.props.dispatch(admin.actions.flag({}, {
      body: JSON.stringify(this.props.flag),
    }, (err) => {
      if (err) {
        window.alert('Something went wrong');
      } else {
        this.handleClose();
      }
    }));
  },

  render() {
    const { flag, isOpen, relationTypes } = this.props;
    const isRelation = flag && flag.type === 'missing-relation';
    const onCancel = this.handleClose;
    const onChange = this.handleChange;
    const onSubmit = this.handleSubmit;
    const relationModalProps = { flag, relationTypes, onCancel, onChange, onSubmit };

    return (
      <Modal
        isOpen={isOpen}
        closeTimeoutMS={150}
        onRequestClose={this.handleClose}
      >
        {isRelation ? <FlagRelationModal {...relationModalProps} /> : null}
      </Modal>
    );
  },
});

export default FlagModal;
