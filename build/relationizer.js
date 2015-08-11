var Relationizer = React.createClass({displayName: "Relationizer",
  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {id: "object1", className: "col"}, 
          React.createElement(ObjectSearch, {apiUrl: this.props.apiUrl, selectPit: this.selectPitFrom})
        ), 
        React.createElement("div", {id: "relation", className: "col"}, 
          React.createElement(CreateRelation, {apiUrl: this.props.apiUrl, ref: "createRelation"})
        ), 
        React.createElement("div", {id: "object2", className: "col"}, 
          React.createElement(ObjectSearch, {apiUrl: this.props.apiUrl, selectPit: this.selectPitTo})
        )
      )
    );
  },

  selectPitFrom: function(pit) {
    this.refs.createRelation.setPitFrom(pit);
  },

  selectPitTo: function(pit) {
    this.refs.createRelation.setPitTo(pit);
  }

});

var ObjectSearch = React.createClass({displayName: "ObjectSearch",
  getInitialState: function() {
    return {
      timeout: null,
      query: ''
    };
  },

  render: function() {
    var features = [];
    if (this.state.geojson) {
      features = this.state.geojson.features;
    }

    return (
      React.createElement("div", null, 
        React.createElement("input", {ref: "search"}), 
        React.createElement("ul", {className: "concepts"}, 
          features.map(function (feature, index) {
            return React.createElement("li", {className: "concept", key: this.state.query + index}, 
              React.createElement(Feature, {feature: feature, selectPit: this.props.selectPit})
            );
          }.bind(this))
        )
      )
    );
  },

  componentDidMount: function() {
    var node = this.refs.search.getDOMNode();

    node.addEventListener('change', function() {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }

      this.search();
    }.bind(this));

    node.addEventListener('input', function() {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }

      this.setState({
        timeout: setTimeout(this.search, 800)
      });
    }.bind(this));
  },

  search: function() {
    var q = this.refs.search.getDOMNode().value;
    d3.json(this.props.apiUrl + 'search?q=' + q, function(geojson) {
      this.setState({
        geojson: geojson,
        query: q
      });
    }.bind(this));
  }

});

var Feature = React.createClass({displayName: "Feature",

  getInitialState: function() {
    var feature = this.props.feature;
    var sortedNames = this.sortNames(feature.properties.pits);
    var selectedName = sortedNames[0].name;
    return {
      name: selectedName,
      type: feature.properties.pits[0].type.replace('hg:', '')
    };
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, 
          React.createElement("span", null, this.state.name), 
          React.createElement("span", {className: "type"}, this.state.type)
        ), 
        React.createElement("ul", {className: "pits"}, 
        this.props.feature.properties.pits.map(function (pit) {
          return React.createElement("li", {className: "pit", key: pit.id || pit.uri}, 
            React.createElement(Pit, {pit: pit, selectPit: this.props.selectPit})
          );
        }.bind(this))
        )
      )
    );
  },

  sortNames: function(pits) {
    var names = pits.map(function(pit) { return pit.name; });
    var counts = {};

    for (var k = 0, j = names.length; k < j; k++) {
      counts[names[k]] = (counts[names[k]] || 0) + 1;
    }

    return Object.keys(counts).map(function(name) {
      return {
        name: name,
        count: counts[name]
      };
    }).sort(function(a, b) {
      return b.count - a.count;
    });
  }

});

var Pit = React.createClass({displayName: "Pit",

  render: function() {
    return (
      React.createElement("div", {onClick: this.select}, this.props.pit.name || this.props.pit.id)
    );
  },

  select: function() {
    this.props.selectPit(this.props.pit);
  }
});

var CreateRelation = React.createClass({displayName: "CreateRelation",
  getInitialState: function() {
    return {
      from: null,
      to: null,
      relations: []
    };
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("select", {ref: "select", value: "hg:liesIn"}, 
        this.state.relations.map(function (relation) {
          return React.createElement("option", {key: relation, value: relation}, 
            relation
          );
        }.bind(this))
        ), 
        React.createElement("button", {className: "btn btn-1 btn-1e", onClick: this.createRelation}, "Create!"), 
        React.createElement("textarea", {ref: "relations"})
      )
    );
  },

  componentDidMount: function() {
    d3.json(this.props.apiUrl + 'schemas/relations', function(json) {
      if (json) {
        this.setState({
          relations: json.properties.type.enum
        });
      }
    }.bind(this));
  },

  createRelation: function() {
    var from = this.state.from ? (this.state.from.id || this.state.from.uri) : null;
    var to = this.state.to ? (this.state.to.id || this.state.to.uri) : null;
    var type = this.refs.select.getDOMNode().value;

    var relation = {
      from: from,
      to: to,
      type: type
    };

    this.refs.relations.getDOMNode().value += '\n' + JSON.stringify(relation);


  },

  setPitFrom: function(pit) {
    this.setState({
      from: pit
    });
  },

  setPitTo: function(pit) {
    this.setState({
      to: pit
    });
  }
});

var apiUrl = 'http://localhost:3001/';
// var apiUrl = 'http://vps662.directvps.nl:3000/';

React.render(
  React.createElement(Relationizer, {apiUrl: apiUrl}),
  document.getElementById('relationizer')
);
