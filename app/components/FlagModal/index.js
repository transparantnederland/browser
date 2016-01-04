import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import StepOne from './StepOne';
import StepTwo from './StepTwo';

import './index.css';

const styles = {
  overlay: {
    backgroundColor: 'rgba(38, 70, 83, 0.54)',
  },
  content: {
    position: 'relative',
    border: 0,
    top: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '400px',
    backgroundColor: 'white',
    borderRadius: '4px',
  },
};

const FlagModal = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      flagType: '',
      flagValue: '',
      step: 1,
    };
  },

  render() {
    const { isOpen, onRequestClose } = this.props;
    const { flagType, flagValue, step } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={styles}
      >
        <StepOne
          show={step === 1}
          value={flagType}
          onNextClick={this.handleNextClick}
        />
        <StepTwo
          show={step === 2}
          value={flagValue}
          onPreviousClick={this.handlePreviousClick}
          onNextClick={this.handleNextClick}
        />

      </Modal>
    );
  },
  handlePreviousClick() {
    this.setState({
      step: this.state.step - 1,
    });
  },
  handleNextClick() {
    this.setState({
      step: this.state.step + 1,
    });
  },
});

export default FlagModal;
