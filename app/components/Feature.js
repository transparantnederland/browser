import React from 'react';

export default React.createClass({
  getInitialState() {
    var feature = this.props.feature;
    var sortedNames = this.sortNames(feature.pits);
    var selectedName = sortedNames[0].name;

    var types = feature.pits.filter(function (pit) {
      return pit.type;
    }).map(function (pit) {
      return pit.type.replace('hg:', '');
    });

    var type;
    if (types.length) {
      type = types[0];
    }

    return {
      name: selectedName,
      type,
    };
  },

  render() {
    return (
      <div className="pad-all feature" onClick={this.handleClick}>
        <h3>
          <span>{this.state.name}</span>
          <span className="type">{this.state.type}</span>
        </h3>
      </div>
    );
  },

  handleClick() {
    this.props.selectPit(this.props.feature.pits[0]);
  },

  sortNames(pits) {
    var names = pits.map(function (pit) { return pit.name; });
    var counts = {};

    for (var k = 0, j = names.length; k < j; k++) {
      counts[names[k]] = (counts[names[k]] || 0) + 1;
    }

    return Object.keys(counts).map(function (name) {
      return {
        name,
        count: counts[name],
      };
    }).sort(function (a, b) {
      return b.count - a.count;
    });
  },

});
