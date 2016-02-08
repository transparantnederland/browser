import React from 'react';
import { connect } from 'react-redux';
import FlagModal from '../components/FlagModal';

import api from '../utils/api';
import admin from '../utils/admin';
import { updateValue, toggleRelationFromTo, resetFlag } from '../actions/flag';

const FlagModalContainer = React.createClass({
  componentWillMount() {
    this.props.dispatch(api.actions.relationTypes());
  },

  handleClose() {
    this.props.dispatch(resetFlag());
  },

  handleChange(event) {
    const value = event.target.value;
    this.props.dispatch(updateValue(value));
  },

  handleToggle() {
    this.props.dispatch(toggleRelationFromTo());
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
    const { flag, isOpen } = this.props;

    return (
      <FlagModal
        flag={flag}
        isOpen={isOpen}
        onCancel={this.handleClose}
        onChange={this.handleChange}
        onToggle={this.handleToggle}
        onSubmit={this.handleSubmit}
      />
    );
  },
});

export default connect(
  (state) => {
    const { flag } = state;

    return {
      flag: flag || {},
      isOpen: !!flag,
    };
  }
)(FlagModalContainer);
