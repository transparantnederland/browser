import React from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-typeahead';
import { pushPath } from 'redux-simple-router';

import api from '../../store/api';

import SearchResults from './../SearchResults';

import './index.css';

const Header = React.createClass({
  render() {
    const options = (this.props.search.data || []).map((results) => {
      const first = results.find((result) => {
        return result.pit.name;
      });
      return first.pit;
    });

    return (
      <div className="Header">
        <a href="/" className="Header-brand">Transparant Nederland</a>
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
              this.props.dispatch(pushPath(option.id.replace('urn:hgid:', '/')));
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
      this.props.dispatch(api.actions.search({ q }));
    } else {
      this.props.dispatch(api.actions.search.reset());
    }
  },
});

export default connect(
  (state) => (state)
)(Header);
