import React from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-typeahead';
import { Link } from 'react-router';
import { pushState } from 'redux-router';

import api from '../../middleware/api';
import SearchResults from './../SearchResults';

import './index.css';

const Header = React.createClass({
  render() {
    const { options } = this.props;

    return (
      <div className="Header">
        <Link className="Header-brand" to="/">Transparant Nederland</Link>
        <form className="Header-form">
          <Typeahead
            placeholder="Search for politicians, organizations, or political parties"
            options={options}
            filterOption="name"
            displayOption="name"
            onKeyUp={this.handleSearch}
            maxVisible={20}
            customListComponent={SearchResults}
            onOptionSelected={(option) => {
              this.props.pushState(null, option.id.replace('urn:hgid:', '/'), '');
            }}
          />
        </form>
      </div>
    );
  },
  handleSearch(event) {
    const query = event.target.value;

    if (query) {
      const q = query + '*';
      this.props.fetchSearch({ q });
    } else {
      this.props.resetSearch();
    }
  },
});

export default connect(
  (state) => ({
    options: (state.search.data || []).map((results) => {
      const first = results.find((result) => {
        return result.pit.name;
      });
      return first.pit;
    }),
  }),
  {
    pushState,
    fetchSearch: api.actions.search,
    resetSearch: api.actions.search.reset,
  }
)(Header);
