import React from 'react';
import { connect } from 'react-redux';

import api from './../middleware/api';

function loadData(props) {
  const { dataset, id } = props;

  props.fetchPit({
    id: [dataset, id].join('/'),
  });
}

const PitPage = React.createClass({
  componentWillMount() {
    loadData(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
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
    const { dataset, id } = state.router.params;
    const {
      pit: { data },
    } = state;

    return {
      data,
      dataset,
      id,
    };
  },
  {
    fetchPit: api.actions.pit,
  }
)(PitPage);
