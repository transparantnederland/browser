import './index.css';
import React from 'react';

const FixedHeaderLayout = ({ children }) =>
  <div className="StickyHeaderLayout">
    <div className="StickyHeaderLayout-header">
      {children[0]}
    </div>
    <div className="StickyHeaderLayout-body">
      {children[1]}
    </div>
  </div>;

export default FixedHeaderLayout;
