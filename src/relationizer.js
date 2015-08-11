var Relationizer = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <div id='object1' className='col'>
          <ObjectSearch apiUrl={this.props.apiUrl} selectPit={this.selectPitFrom} />
        </div>
        <div id='relation' className='col'>
          <CreateRelation apiUrl={this.props.apiUrl} ref='createRelation' />
        </div>
        <div id='object2' className='col'>
          <ObjectSearch apiUrl={this.props.apiUrl} selectPit={this.selectPitTo} />
        </div>
      </div>
    );
  },

  selectPitFrom: function(pit) {
    this.refs.createRelation.setPitFrom(pit);
  },

  selectPitTo: function(pit) {
    this.refs.createRelation.setPitTo(pit);
  }

});

var ObjectSearch = React.createClass({
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
      <div>
        <input ref='search' />
        <ul className='concepts'>
          {features.map(function (feature, index) {
            return <li className='concept' key={this.state.query + index}>
              <Feature feature={feature} selectPit={this.props.selectPit} />
            </li>;
          }.bind(this))}
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
        geojson: geojson,
        query: q
      });
    }.bind(this));
  }

});

var Feature = React.createClass({

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
      <div>
        <h2>
          <span>{this.state.name}</span>
          <span className='type'>{this.state.type}</span>
        </h2>
        <ul className='pits'>
        {this.props.feature.properties.pits.map(function (pit) {
          return <li className='pit' key={pit.id || pit.uri}>
            <Pit pit={pit} selectPit={this.props.selectPit} />
          </li>;
        }.bind(this))}
        </ul>
      </div>
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

var Pit = React.createClass({

  render: function() {
    return (
      <div onClick={this.select}>{this.props.pit.name || this.props.pit.id}</div>
    );
  },

  select: function() {
    this.props.selectPit(this.props.pit);
  }
});

var CreateRelation = React.createClass({
  getInitialState: function() {
    return {
      from: null,
      to: null,
      relations: []
    };
  },

  render: function() {
    return (
      <div>
        <select ref='select' value='hg:liesIn'>
        {this.state.relations.map(function (relation) {
          return <option key={relation} value={relation}>
            {relation}
          </option>;
        }.bind(this))}
        </select>
        <button className="btn btn-1 btn-1e" onClick={this.createRelation}>Create!</button>
        <textarea ref='relations' />
      </div>
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
  <Relationizer apiUrl={apiUrl} />,
  document.getElementById('relationizer')
);
