import './index.css';
import React, { PropTypes } from 'react';

const FlexItem = ({ children }) =>
  <div className="FlexItem">
    {children}
  </div>;

FlexItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlexItem;
