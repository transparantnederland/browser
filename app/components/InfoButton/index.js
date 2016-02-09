import './index.css';
import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';

const InfoButton = ({ children }) =>
  <div className="InfoButton">
    <Tooltip
      placement="right"
      trigger="click"
      animation="zoom"
      overlayClassName="InfoButton-bubble"
      overlay={children}
      destroyTooltipOnHide
    >
      <span className="InfoButton-info">?</span>
    </Tooltip>
  </div>;

InfoButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InfoButton;
