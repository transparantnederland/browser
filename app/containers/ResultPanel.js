import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import api from '../utils/api';

import StickyHeaderLayout from '../layouts/StickyHeaderLayout';
import Results from '../components/Results';
import Search from '../components/Search';

const WILDCARD = '*';

function loadData(props, state) {
  const { dispatch, query } = props;
  const { q } = state;

  if (q !== '') {
    dispatch(api.actions.concepts(Object.assign({}, query, {
      q: q + WILDCARD,
    })));
  } else {
    dispatch(api.actions.concepts.reset());
  }
}

const ResultPanel = React.createClass({

  getInitialState() {
    return {
      q: this.props.q,
    };
  },

  componentWillMount() {
    loadData(this.props, this.state);
  },

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.query, nextProps.query)) {
      loadData(nextProps, this.state);
    }
  },

  onSearchChange(text) {
    const q = text.trim();
    this.setState({ q }, () => {
      loadData(this.props, this.state);
    });
  },

  render() {
    const { concepts } = this.props;
    const { q } = this.state;

    return (
      <StickyHeaderLayout>
        <Search onChange={this.onSearchChange} value={q} />
        <Results concepts={concepts} query={q} />
      </StickyHeaderLayout>
    );
  },

});

export default connect(
  (state) => {
    const {
      router: { params: { type, dataset }, location },
      data: { concepts },
    } = state;

    const query = _.omit({ type, dataset }, _.isUndefined);
    const q = location.query.q || '';

    return {
      q,
      query,
      concepts: concepts.data,
    };
  }
)(ResultPanel);
