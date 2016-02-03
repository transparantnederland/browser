import './index.css';
import React, { PropTypes } from 'react';

const ModalHeading = ({ children }) =>
  <div className="ModalHeading">
    {children}
  </div>;

ModalHeading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalHeading;
