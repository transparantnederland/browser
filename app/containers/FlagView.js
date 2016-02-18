import React from 'react';
import { connect } from 'react-redux';

import admin from '../utils/admin';

import SingleColumnLayout from '../layouts/SingleColumnLayout';
import FlagList from '../components/FlagList';

const FlagView = React.createClass({
  componentWillMount() {
    this.props.dispatch(admin.actions.flags());
  },

  render() {
    const { flags, dispatch } = this.props;

    return (
      <SingleColumnLayout>
        <FlagList flags={flags} dispatch={dispatch} />
      </SingleColumnLayout>
    );
  },
});

export default connect(
  (state) => {
    const { data: { flags } } = state;

    return {
      flags: flags.data,
    };
  }
)(FlagView);
