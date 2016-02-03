import React from 'react';
import { connect } from 'react-redux';
import FlagModal from '../components/FlagModal';

import api from '../utils/api';

const FlagModalContainer = React.createClass({
  componentWillMount() {
    this.props.dispatch(api.actions.relationTypes());
  },

  render() {
    return (
      <FlagModal {...this.props} />
    );
  },
});

export default connect(
  (state) => {
    const { flag } = state;

    return {
      flag,
      isOpen: !!flag,
      relationTypes: state.data.relationTypes.data,
    };
  }
)(FlagModalContainer);
