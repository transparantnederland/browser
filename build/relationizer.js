var Relationizer = React.createClass({displayName: "Relationizer",
  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {id: "object1", className: "col"}, 
          React.createElement(ObjectSearch, {apiUrl: this.props.apiUrl})
        ), 
        React.createElement("div", {id: "relation", className: "col"}, 
          React.createElement(CreateRelation, {apiUrl: this.props.apiUrl})
        ), 
        React.createElement("div", {id: "object2", className: "col"}, 
          React.createElement(ObjectSearch, {apiUrl: this.props.apiUrl})
        )
      )
    );
  }
});

var ObjectSearch = React.createClass({displayName: "ObjectSearch",
  getInitialState: function() {
    return {
      timeout: null
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
        React.createElement("ul", null, 
          features.map(function (feature, index) {
            return React.createElement("li", null, 
              React.createElement(Feature, {feature: feature, key: index})
            );
          })
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
        geojson: geojson
      });
    }.bind(this));
  }

});

var Feature = React.createClass({displayName: "Feature",
  render: function() {
    return (
      React.createElement("ul", null, 
      this.props.feature.properties.pits.map(function (pit) {
        return React.createElement("li", null, 
          React.createElement(Pit, {pit: pit, key: pit.id || pit.uri})
        );
      })
      )
    );
  }
});

var Pit = React.createClass({displayName: "Pit",
  render: function() {
    return (
      React.createElement("div", null, this.props.pit.name || this.props.pit.id)
    );
  }
});

var CreateRelation = React.createClass({displayName: "CreateRelation",
  getInitialState: function() {
    return {
      relations: []
    };
  },

  render: function() {
    return (
      React.createElement("ul", null, 
      this.state.relations.map(function (relation) {
        return React.createElement("li", null, 
          React.createElement("div", {key: relation}, 
        relation
          )
        );
      })
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
  }
});

React.render(
  React.createElement(Relationizer, {apiUrl: "http://vps662.directvps.nl:3000/"}),
  document.getElementById('relationizer')
);
