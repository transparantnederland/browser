import React, { PropTypes } from 'react';
import Modal from 'react-modal';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

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

function shouldShowBackButton(step) {
  return step !== 1;
}

function shouldDisableNextButton(step, flag) {
  switch (step) {
    case 1:
      return !flag.type;
    case 2:
      return !flag.value;
    default:
      return true;
  }
}

const FlagModal = React.createClass({
  propTypes: {
    concept: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      flag: {
        pit: this.props.concept.pits[0],
        type: '',
        value: null,
      },
      step: 1,
      showBackButton: false,
      disableNextButton: true,
    };
  },

  render() {
    const { isOpen, onRequestClose } = this.props;
    const { flag, step, showBackButton, disableNextButton } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={styles}
      >
        <div className="FlagModal">
          {step === 1 ? <StepOne flag={flag} onFlagChange={this._onChange}/> : null}
          {step === 2 ? <StepTwo flag={flag} onFlagChange={this._onChange}/> : null}
          {step === 3 ? <StepThree flag={flag} /> : null}

          <div className="FlagModal-actions">
            {showBackButton ? <button onClick={this.handlePrevClick}>Back</button> : null}
            <button disabled={disableNextButton} onClick={this.handleNextClick}>Next</button>
          </div>
        </div>
      </Modal>
    );
  },
  _onChange(nextFlag) {
    const { flag, step } = this.state;
    const updatedFlag = Object.assign({}, flag, nextFlag);

    this.setState({
      flag: updatedFlag,
      showBackButton: shouldShowBackButton(step),
      disableNextButton: shouldDisableNextButton(step, updatedFlag),
    });
  },
  handlePrevClick() {
    const step = this.state.step - 1;
    const showBackButton = shouldShowBackButton(step);
    const disableNextButton = shouldDisableNextButton(step, this.state.flag);

    this.setState({
      step,
      showBackButton,
      disableNextButton,
    });
  },
  handleNextClick() {
    const step = this.state.step + 1;
    const showBackButton = shouldShowBackButton(step);
    const disableNextButton = shouldDisableNextButton(step, this.state.flag);

    this.setState({
      step,
      showBackButton,
      disableNextButton,
    });
  },
});

export default FlagModal;
