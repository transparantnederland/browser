import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import api from '../utils/api';

import StickyHeaderLayout from '../layouts/StickyHeaderLayout';
import ConceptList from '../components/ConceptList';
import Search from '../components/Search';

function loadData(props, state) {
  const { fetchResults, query } = props;
  const { q } = state;

  fetchResults(Object.assign({}, query, { q }));
}

const ResultPanel = React.createClass({

  getInitialState() {
    return {
      q: '*',
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
    const q = text.trim() + '*';
    this.setState({ q }, loadData(this.props, this.state));
  },

  render() {
    const { concepts } = this.props;

    return (
      <StickyHeaderLayout>
        <Search onChange={this.onSearchChange} />
        <ConceptList concepts={concepts} />
      </StickyHeaderLayout>
    );
  },

});

export default connect(
  (state) => {
    const {
      router: { params: { type, dataset } },
      data: { concepts },
    } = state;

    const query = _.omit({ type, dataset }, _.isUndefined);

    return {
      query,
      concepts: concepts.data,
    };
  },
  {
    fetchResults: api.actions.concepts,
  }
)(ResultPanel);
