import React from 'react';
import { connect } from 'react-redux';
import FlagModal from '../components/FlagModal';

import api from '../utils/api';
import admin from '../utils/admin';
import { updateRelationType, resetFlag } from '../actions/flag';

const FlagModalContainer = React.createClass({
  componentWillMount() {
    this.props.dispatch(api.actions.relationTypes());
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
        // FIXME this works, but is a hacky way to show new flags on concept
        this.props.dispatch(admin.actions.flags({ concept: this.props.flag.concept.id }));
        this.handleClose();
      }
    }));
  },

  render() {
    const { flag, relationTypes, isOpen } = this.props;

    return (
      <FlagModal
        flag={flag}
        relationTypes={relationTypes}
        isOpen={isOpen}
        onCancel={this.handleClose}
        onChange={this.handleChange}
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
      relationTypes: state.data.relationTypes.data,
    };
  }
)(FlagModalContainer);
