import React from 'react';

import NavContainer from './NavContainer';
import FlagModalContainer from './FlagModalContainer';

import './app.css';

const App = React.createClass({
  render() {
    return (
      <div className="App">
        <NavContainer />
        {this.props.children}
        <FlagModalContainer />
      </div>
    );
  },
});

export default App;
