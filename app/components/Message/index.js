import './index.css';
import React, { PropTypes } from 'react';

const Message = ({ children }) =>
  <div className="Message">
    {children}
  </div>;

Message.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Message;
