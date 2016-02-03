import './index.css';
import React, { PropTypes } from 'react';

import Padding from '../Padding';

const ModalHeading = ({ children }) =>
  <div className="ModalHeading">
    <Padding>
      {children}
    </Padding>
  </div>;

ModalHeading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalHeading;
