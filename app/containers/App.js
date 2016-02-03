import React from 'react';

import NavContainer from './NavContainer';
import FlagModal from './FlagModal';

import './app.css';

const App = React.createClass({
  render() {
    return (
      <div className="App">
        <NavContainer />
        {this.props.children}
        <FlagModal />
      </div>
    );
  },
});

export default App;
