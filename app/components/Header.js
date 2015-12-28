import React from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-typeahead';

import api from '../store/api';

import SearchResults from './SearchResults';

const Header = React.createClass({
  render() {
    const options = (this.props.search.data || []).map((results) => {
      const first = results.find((result) => {
        return result.pit.name;
      });
      return first.pit;
    });

    return (
      <div className="pure-menu pure-menu-horizontal">
        <a href="#" className="pure-menu-heading pure-menu-link">BRAND</a>
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <form className="pure-form">
              <Typeahead
                placeholder="Search for politicians, organizations, or political parties"
                options={options}
                filterOption="name"
                onKeyUp={this.handleSearch}
                maxVisible={20}
                customListComponent={SearchResults}
              />
            </form>
          </li>
        </ul>
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

// this.props.dispatch(api.actions.from({ q }));

// defaultClassNames={false}

// <input
//   type="search"
//   placeholder="Search for politicians, organizations, or political parties"
//   />
