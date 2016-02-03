import './index.css';
import React, { PropTypes } from 'react';

const Button = ({ children, onClick, type }) =>
  <button
    className={['Button', type ? 'Button-' + type : ''].join(' ')}
    onClick={onClick}
  >
    {children}
  </button>;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  primary: PropTypes.bool,
};

export default Button;
