import React from 'react';
import { connect } from 'react-redux';

import api from '../utils/api';

import Nav from '../components/Nav';

const NavContainer = React.createClass({
  componentWillMount() {
    this.props.dispatch(api.actions.types());
    this.props.dispatch(api.actions.datasets());
  },

  render() {
    const { datasets, types } = this.props;

    return (
      <Nav datasets={datasets} types={types} />
    );
  },
});

export default connect(
  (state) => ({
    router: state.router,
    types: state.data.types.data,
    datasets: state.data.datasets.data,
  })
)(NavContainer);
