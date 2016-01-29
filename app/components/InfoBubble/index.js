import './index.css';
import React, { PropTypes } from 'react';
import Tooltip from 'rc-tooltip';

const InfoBubble = ({ info }) =>
  <div className="InfoBubble">
    <Tooltip
      placement="right"
      trigger="hover"
      animation="zoom"
      overlayClassName="InfoBubble-bubble"
      overlay={<span>{info}</span>}
      destroyTooltipOnHide
    >
      <span className="InfoBubble-info">?</span>
    </Tooltip>
  </div>;

InfoBubble.propTypes = {
  info: PropTypes.string.isRequired,
};

export default InfoBubble;
