import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { setType, setValue } from './../../actions/flag';

import SelectTypeStep from './SelectTypeStep';
import SelectValueStep from './SelectValueStep';
import ConfirmStep from './ConfirmStep';

import './index.css';

const styles = {
  overlay: {
    backgroundColor: 'rgba(38, 70, 83, 0.54)',
  },
  content: {
    overflow: 'visible',
    position: 'relative',
    padding: 0,
    border: 0,
    top: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '420px',
    backgroundColor: 'transparent',
    borderRadius: '0',
  },
};

const FlagModal = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      isOpen: false,
      step: 1,
    };
  },

  componentWillUpdate(nextProps) {
    const { flag } = nextProps;

    if (flag.concept && !this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }
  },

  render() {
    const { flag } = this.props;
    const { step, isOpen } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => this.setState({ isOpen: false })}
        style={styles}
      >
        <div className="FlagModal-header">
          Flag this concept
        </div>
        <div className="FlagModal-content">
          {{
            1: <SelectTypeStep flag={flag} onSelect={this._onSelectType}/>,
            2: <SelectValueStep flag={flag} onSelect={this._onSelectValue}/>,
            3: <ConfirmStep flag={flag}/>,
          }[step]}
        </div>
        <div className="FlagModal-footer">
          <button onClick={this.handleBackClick}>Back</button>
          <button onClick={this.handleNextClick}>Next</button>
        </div>
      </Modal>
    );
  },

  handleBackClick() {
    this.setState({
      step: this.state.step - 1,
    });
  },

  handleNextClick() {
    this.setState({
      step: this.state.step + 1,
    });
  },

  _onSelectType(type) {
    this.props.dispatch(setType(type));
    this.setState({
      step: 2,
    });
  },

  _onSelectValue(value) {
    this.props.dispatch(setValue(value));
    this.setState({
      step: 3,
    });
  },
});

export default connect(
  (state) => (state)
)(FlagModal);


// function shouldShowBackButton(step) {
//   return step !== 1;
// }
//
// function shouldDisableNextButton(step, flag) {
//   switch (step) {
//     case 1:
//       return !flag.type;
//     case 2:
//       return !flag.value;
//     case 3:
//       return false;
//     default:
//       return true;
//   }
// }
//   // <div className="FlagModal">
  //   {step === 1 ? <StepOne flag={flag} onFlagChange={this._onChange}/> : null}
  //   {step === 2 ? <StepTwo flag={flag} onFlagChange={this._onChange}/> : null}
  //   {step === 3 ? <StepThree flag={flag} /> : null}
  //
  //   <div className="FlagModal-actions">
  //     {showBackButton ? <button onClick={this.handlePrevClick}>Back</button> : null}
  //     <button disabled={disableNextButton} onClick={this.handleNextClick}>{step === 3 ? 'Done' : 'Next'}</button>
  //   </div>
  // </div>
  // _onChange(nextFlag) {
    // const { flag, step } = this.state;
    // const updatedFlag = Object.assign({}, flag, nextFlag);
    //
    // this.setState({
    //   flag: updatedFlag,
    //   showBackButton: shouldShowBackButton(step),
    //   disableNextButton: shouldDisableNextButton(step, updatedFlag),
    // });
  // },
  // handlePrevClick() {
    // const step = this.state.step - 1;
    // const showBackButton = shouldShowBackButton(step);
    // const disableNextButton = shouldDisableNextButton(step, this.state.flag);
    //
    // this.setState({
    //   step,
    //   showBackButton,
    //   disableNextButton,
    // });
  // },
  // handleNextClick() {
    // if (this.state.step === 3) {
    //   this.props.flag({}, {
    //     body: JSON.stringify({
    //       pit: this.state.flag.pit.id,
    //       type: this.state.flag.type,
    //       value: this.state.flag.value,
    //     }),
    //   });
    //   return;
    // }
    //
    // const step = this.state.step + 1;
    // const showBackButton = shouldShowBackButton(step);
    // const disableNextButton = shouldDisableNextButton(step, this.state.flag);
    //
    // this.setState({
    //   step,
    //   showBackButton,
    //   disableNextButton,
    // });
  // },
