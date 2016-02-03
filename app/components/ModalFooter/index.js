import './index.css';
import React, { PropTypes } from 'react';

import Padding from '../Padding';

const ModalFooter = ({ children }) =>
  <div className="ModalFooter">
    <Padding>
      {children}
    </Padding>
  </div>;

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalFooter;
