import React from 'react';
import { connect } from 'react-redux';

import api from './../store/api';

function loadData(props) {
  const {
    params: { dataset, id },
  } = props;

  props.dispatch(api.actions.pit({
    id: [dataset, id].join('/'),
  }));
}

const PitView = React.createClass({
  componentWillMount() {
    loadData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.path !== nextProps.path) {
      loadData(nextProps);
    }
  },

  render() {
    const { data } = this.props;
    const concept = (data && data[0]) || [];
    const pit = concept[0] && concept[0].pit;

    if (!pit) {
      return (<div>Loading…</div>);
    }

    return (
      <div>
        <h1>{pit.name}</h1>
        <span>{pit.type}</span>
      </div>
    );
  },
});


export default connect(
  (state) => {
    const {
      pit: { data },
      routing: { path },
    } = state;

    return {
      data,
      path,
    };
  }
)(PitView);
