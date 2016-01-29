import React from 'react';

import NavContainer from './NavContainer';

import './app.css';

const App = React.createClass({
  render() {
    return (
      <div className="App">
        <NavContainer />
        {this.props.children}
      </div>
    );
  },
});

export default App;
