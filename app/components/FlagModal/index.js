import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { setConcept, setType, setValue } from './../../actions/flag';

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
    concept: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
  },

  getInitialState() {
    return {
      step: 1,
    };
  },

  componentWillReceiveProps(nextProps) {
    const conceptId = this.props.concept && this.props.concept.id;
    const nextConceptId = nextProps.concept && nextProps.concept.id;

    if (conceptId !== nextConceptId) {
      this.props.dispatch(setConcept(nextProps.concept));
    }
  },

  render() {
    const { flag, isOpen } = this.props;
    const { step } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.handleClose}
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

  handleClose() {
    debugger;
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
