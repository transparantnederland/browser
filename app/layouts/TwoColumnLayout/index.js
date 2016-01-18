import './index.css';
import React from 'react';

const TwoColumnLayout = ({ children }) =>
  <div className="TwoColumnLayout">
    <div className="TwoColumnLayout-left">
      {children[0]}
    </div>
    <div className="TwoColumnLayout-right">
      {children[1]}
    </div>
  </div>;

export default TwoColumnLayout;
