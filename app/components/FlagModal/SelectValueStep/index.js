import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-typeahead';

import TypeaheadList from './../../TypeaheadList';

import api from './../../../utils/api';

const { actions } = api;

const SelectValueStep = React.createClass({
  propTypes: {
    flag: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  },

  componentWillMount() {
    if (!this.props.relationTypes.length) {
      this.props.dispatch(actions.relationTypes());
    }
    if (!this.props.pitTypes.length) {
      this.props.dispatch(actions.pitTypes());
    }
  },

  getInitialState() {
    return {
      value: this.props.flag.value,
      canEditType: this.props.flag.type !== 'duplicate',
    };
  },

  render() {
    const { flag, options, relationTypes, pitTypes } = this.props;
    const { canEditType } = this.state;

    if (flag.type === 'wrong-type') {
      return (
        <div>
          <label>New type:</label>

          <select
            value={flag.concept.type}
            onChange={this.handlePitTypeChange}
          >
            {pitTypes.map((pitType) =>
              <option key={pitType} value={pitType}>{pitType}</option>
            )}
          </select>
        </div>
      );
    } else {
      return (
        <div>
          <label>
            <select
              value={flag.value.type}
              disabled={!canEditType}
              onChange={this.handleTypeChange}
              >
              <option key="">-- select a relation type --</option>
              {relationTypes.map((relationType) =>
                <option key={relationType} value={relationType}>{relationType}</option>
              )}
            </select>
          </label>
          <label>
            <Typeahead
              placeholder="Search"
              options={options}
              filterOption="name"
              displayOption="name"
              onKeyUp={this.handleKeyUp}
              maxVisible={20}
              customListComponent={TypeaheadList}
              onOptionSelected={this.handleConceptSelect}
            />
          </label>
        </div>
      );
    }
  },
  handlePitTypeChange(event) {
    const pitType = event.target.value;

    this.props.onSelect(pitType);
  },
  handleTypeChange(event) {
    const type = event.target.value;

    this.setState({
      value: Object.assign({}, this.state.value, { type }),
    }, this.handleSelect);
  },
  handleConceptSelect(concept) {
    this.setState({
      value: Object.assign({}, this.state.value, { concept }),
    }, this.handleSelect);
  },
  handleSelect() {
    const { value } = this.state;

    if (value.type && value.concept) {
      this.props.onSelect(value);
    }
  },
  handleKeyUp(event) {
    const value = event.target.value.trim();
    const params = {
      q: [value, '*'].join(''),
    };

    if (this.state.value.type === 'tnl:same' && this.props.flag.concept.type === 'tnl:Person') {
      params.type = this.props.flag.concept.type;
    }

    if (value) {
      this.props.dispatch(actions.search(params));
    } else {
      this.props.dispatch(actions.search.reset());
    }
  },
});

export default connect(
  (state) => {
    const { concept, conceptRelations } = state.data;

    // Extract relation ids from concept pits and relations
    const relationIds = ((concept.data && concept.data.pits) || [])
      // .concat((conceptRelations.data || []).map((relation) => relation.concept))
      .map((pit) => pit.id);

    return {
      options: state.data.search.data.filter((option) => {
        return relationIds.indexOf(option.id) === -1;
      }),
      relationTypes: state.data.relationTypes.data,
      pitTypes: state.data.types.data,
    };
  }
)(SelectValueStep);
