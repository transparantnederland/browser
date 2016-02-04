import './index.css';
import React, { PropTypes } from 'react';

const Flex = ({ children }) =>
  <div className="Flex">
    {children}
  </div>;

Flex.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Flex;
