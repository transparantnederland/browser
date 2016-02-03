import './index.css';
import React, { PropTypes } from 'react';

const ModalBody = ({ children }) =>
  <div className="ModalBody">
    {children}
  </div>;

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
