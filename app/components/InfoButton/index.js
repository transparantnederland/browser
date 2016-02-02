import './index.css';
import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';

const InfoButton = ({ info }) =>
  <div className="InfoButton">
    <Tooltip
      placement="right"
      trigger="click"
      animation="zoom"
      overlayClassName="InfoButton-bubble"
      overlay={<span>{info}</span>}
      destroyTooltipOnHide
    >
      <span className="InfoButton-info">?</span>
    </Tooltip>
  </div>;

InfoButton.propTypes = {
  info: PropTypes.string.isRequired,
};

export default InfoButton;
