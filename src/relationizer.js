var Relationizer = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <div id='object1' className='col'>
          <ObjectSearch apiUrl={this.props.apiUrl} />
        </div>
        <div id='relation' className='col'>
          <CreateRelation apiUrl={this.props.apiUrl} />
        </div>
        <div id='object2' className='col'>
          <ObjectSearch apiUrl={this.props.apiUrl} />
        </div>
      </div>
    );
  }
});

var ObjectSearch = React.createClass({
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
      <div>
        <input ref='search' />
        <ul>
          {features.map(function (feature, index) {
            return <li>
              <Feature feature={feature} key={index} />
            </li>;
          })}
        </ul>
      </div>
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

var Feature = React.createClass({
  render: function() {
    return (
      <ul>
      {this.props.feature.properties.pits.map(function (pit) {
        return <li>
          <Pit pit={pit} key={pit.id || pit.uri} />
        </li>;
      })}
      </ul>
    );
  }
});

var Pit = React.createClass({
  render: function() {
    return (
      <div>{this.props.pit.name || this.props.pit.id}</div>
    );
  }
});

var CreateRelation = React.createClass({
  getInitialState: function() {
    return {
      relations: []
    };
  },

  render: function() {
    return (
      <ul>
      {this.state.relations.map(function (relation) {
        return <li>
          <div key={relation}>
        {relation}
          </div>
        </li>;
      })}
      </ul>
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
  <Relationizer apiUrl='http://vps662.directvps.nl:3000/'/>,
  document.getElementById('relationizer')
);
