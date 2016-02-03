import './index.css';
import React, { PropTypes } from 'react';

import Padding from '../Padding';

const ModalBody = ({ children }) =>
  <div className="ModalBody">
    <Padding>
      {children}
    </Padding>
  </div>;

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
