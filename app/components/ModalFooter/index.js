import './index.css';
import React, { PropTypes } from 'react';

const ModalFooter = ({ children }) =>
  <div className="ModalFooter">
    {children}
  </div>;

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalFooter;
