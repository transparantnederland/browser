import './index.css';
import React, { PropTypes } from 'react';

const Padding = ({ children, horizontal, vertical }) =>
  <div className={[
    'Padding',
    horizontal ? 'Padding__horizontal' : '',
    vertical ? 'Padding__vertical' : '',
  ].join(' ')}
  >
    {children}
  </div>;

Padding.propTypes = {
  children: PropTypes.node.isRequired,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default Padding;
