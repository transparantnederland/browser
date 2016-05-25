import './index.css';
import React, { PropTypes } from 'react';

const LynksLink = ({ id, children }) =>
  <a
    className="LynksLink"
    href={'http://lynksoft.com/external?type=tnl&term=' + id}
    target="_blank"
  >
    {children}
  </a>;

LynksLink.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LynksLink;
