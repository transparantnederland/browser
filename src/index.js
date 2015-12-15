var React = require('react');
var ReactDOM = require('react-dom');
var Codemirror = require('react-codemirror');

require('whatwg-fetch');
require('codemirror/mode/javascript/javascript');

require('./../css/normalize.css');
require('./../css/skeleton.css');
require('./../css/style.css');
require('./../css/codemirror.css');

var App = React.createClass({
  render() {
    var apiUrl = this.props.config.api.baseUrl;
    return (
      <div className="container">
        <div id="object1" className="col">
          <ObjectSearch apiUrl={apiUrl} selectPit={this.selectPitFrom} title="1. Find first PIT" />
        </div>
        <div id="relation" className="col">
          <CreateRelation apiUrl={apiUrl} ref="createRelation" title="3. Create a relation" />
        </div>
        <div id="object2" className="col">
          <ObjectSearch apiUrl={apiUrl} selectPit={this.selectPitTo} title="2. Find second PIT" />
        </div>
      </div>
    );
  },

  selectPitFrom(pit) {
    this.refs.createRelation.setPitFrom(pit);
  },

  selectPitTo(pit) {
    this.refs.createRelation.setPitTo(pit);
  }

});

var ObjectSearch = React.createClass({
  getInitialState() {
    return {
      timeout: null,
      query: ''
    };
  },

  render() {
    var features = [];
    if (this.state.geojson) {
      features = this.state.geojson;
    }

    return (
      <div>
        <div className='pad-top'>
          <h2>{this.props.title}</h2>
        </div>
        <div className='pad-all'>
          <input type='search' ref='search' placeholder='Search by name, URI, or Histograph ID' />
        </div>
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

  componentDidMount() {
    var node = this.refs.search;

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

  search() {
    var q = this.refs.search.value;

    fetch(this.props.apiUrl + 'search?q=' + q)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        this.setState({
          geojson: json && json.map(function(concept) {
            return {
              properties: {
                pits: [concept[0].pit]
              }
            }
          }),
          query: q
        });
      }.bind(this));
  }

});

var Feature = React.createClass({

  getInitialState() {
    var feature = this.props.feature;
    var sortedNames = this.sortNames(feature.properties.pits);
    var selectedName = sortedNames[0].name;

    var types = feature.properties.pits.filter(function(pit) {
      return pit.type;
    }).map(function(pit) {
      return pit.type.replace('hg:', '');
    });

    var type;
    if (types.length) {
      type = types[0];
    }

    return {
      name: selectedName,
      type
    };
  },

  render() {
    return (
      <div className='pad-top-bottom'>
        <div className='pad-left-right'>
          <h3>
            <span>{this.state.name}</span>
            <span className='type'>{this.state.type}</span>
          </h3>
        </div>
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

  sortNames(pits) {
    var names = pits.map(function(pit) { return pit.name; });
    var counts = {};

    for (var k = 0, j = names.length; k < j; k++) {
      counts[names[k]] = (counts[names[k]] || 0) + 1;
    }

    return Object.keys(counts).map(function(name) {
      return {
        name,
        count: counts[name]
      };
    }).sort(function(a, b) {
      return b.count - a.count;
    });
  }

});

var Pit = React.createClass({

  render() {
    return (
      <div className='pad-all' onClick={this.select}>
        <h4>{this.props.pit.name || this.props.pit.id}</h4>
        <div className='table-container'>
          <table>
            <tr>
              <td className='label'>Dataset</td>
              <td><code>{this.props.pit.dataset}</code></td>
            </tr>
            <tr>
              <td className='label'>ID</td>
              <td>{this.props.pit.id || this.props.pit.uri}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  },

  select() {
    this.props.selectPit(this.props.pit);
  }
});

var CreateRelation = React.createClass({
  getInitialState() {
    var relations = [];
    var relationsStr = localStorage.getItem('relations');
    if (relationsStr) {
      try {
        relations = JSON.parse(relationsStr);
      } catch (e) {
        relations = [];
      }
    }

    return {
      from: null,
      to: null,
      types: [],
      relation: 'tnl:related',
      relations
    };
  },

  render() {
    var relations = this.state.relations;
    return (
      <div>
        <div className='pad-top'>
          <h2>{this.props.title}</h2>
        </div>
        <div className='pad-all input'>
          <select ref='select' value={this.state.relation} onChange={this.setRelation}>
          {this.state.types.map(function (type) {
            return <option key={type} value={type}>
              {type}
            </option>;
          }.bind(this))}
          </select>
          <button className="btn btn-1 btn-1e" onClick={this.createRelation}>Create!</button>
        </div>
        <div className='pad-all'>
          <div id='relations-container'>
            <Codemirror value={relations.join('\n')} options={{mode: 'javascript'}} />
          </div>
        </div>
      </div>
    );
  },

  componentDidMount() {
    fetch(this.props.apiUrl + 'schemas/relations')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        this.setState({
          types: json.properties.type.enum
        });
      }.bind(this));
  },

  setRelation() {
    var relation = this.refs.select.value;
    this.setState({
      relation
    });
  },

  createRelation() {
    var from = this.state.from ? (this.state.from.id || this.state.from.uri) : null;
    var to = this.state.to ? (this.state.to.id || this.state.to.uri) : null;
    var type = this.state.relation;

    var relation = {
      from,
      to,
      type
    };

    var relations = this.state.relations
    relations.push(JSON.stringify(relation));

    localStorage.setItem('relations', JSON.stringify(relations));

    this.setState({
      relations
    });
  },

  setPitFrom(pit) {
    this.setState({
      from: pit
    });
  },

  setPitTo(pit) {
    this.setState({
      to: pit
    });
  }
});

var el = document.getElementById('app');
ReactDOM.render(<App config={__CONFIG__} />, el);
